<template>
  <PageFull>
    <div class="flex flex-col justify-between h-full w-full">
      <!-- progress bar -->
      <ProgressBar
        :total="wazaStore.total"
        :completedTotal="wazaStore.completedTotal"
        :percentComplete="wazaStore.percentComplete"
      />

      <!-- waza -->
      <div class="text-center" v-if="wazaStore.remaining">
        <h1 class="text-6xl font-bold sm:text-6xl xl:text-7xl">{{ state.waza.kanji }}</h1>
        <h2 class="text-4xl font-bold mb-4 sm:text-4xl xl:text-6xl">{{ state.waza.name }}</h2>

        <div class="h-20">
          <p class="text-xl" v-if="state.waza.ambiguous && !state.showDetails">
            {{ wazaStore.seriesByKey(state.waza.seriesKey).name }}
          </p>
          <p class="text-xl" v-show="state.showDetails">
            {{ state.waza.meaning }}<br />
            {{ wazaStore.seriesByKey(state.waza.seriesKey).kanji }}
            {{ wazaStore.seriesByKey(state.waza.seriesKey).name }} - {{ state.waza.order }}
          </p>
          <div class="pt-1" v-if="!state.showDetails">
            <BaseButton
              styleType="inverted"
              size="small"
              label="Details"
              @button-action="handleDetails"
            />
          </div>
        </div>
      </div>
      <div class="text-center" v-else>
        <h1 class="text-6xl font-bold sm:text-7xl">Awesome Job!</h1>
      </div>

      <!-- CTAs  -->
      <div class="flex justify-between items-center" v-if="wazaStore.remaining">
        <BaseButton
          styleType="inverted"
          size="small"
          label="Restart"
          @button-action="handleStartOver"
        />

        <BaseButton size="large" label="Next ⇒" @button-action="handleNext" />
      </div>
      <div class="flex justify-center items-center" v-else>
        <BaseButton
          styleType="inverted"
          size="large"
          label="Restart"
          @button-action="handleStartOver"
        />
      </div>
    </div>
  </PageFull>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useWazaStore } from '@/stores/wazaStore';
import PageFull from '@/components/PageFull.vue';
import BaseButton from '@/components/BaseButton.vue';
import ProgressBar from '@/components/ProgressBar.vue';

const router = useRouter();
const route = useRoute();
const wazaStore = useWazaStore();

// TODO: types
interface State {
  waza: object | null;
}

const state = ref({
  waza: null,
  showDetails: false,
});

/* LIFECYCLE */
// TODO: fix types
onBeforeMount(() => {
  wazaStore.setSeriesFocus(route.query.series || 'all');
  wazaStore.setOrder(route.query.order || 'random');
  handleNext();
});

/* METHODS */
function handleStartOver() {
  wazaStore.resetComplete();
  router.push('/');
}

function handleNext() {
  state.value.showDetails = false;

  // complete kata
  if (state.value.waza) {
    wazaStore.markComplete(state.value.waza);
  }
  // get next
  state.value.waza = wazaStore.nextWaza;
}

function handleDetails() {
  state.value.showDetails = true;
}
</script>
