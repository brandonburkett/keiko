<template>
  <PageFull>
    <div class="flex flex-col justify-between h-full w-full">
      <!-- progress bar -->
      <ProgressBar
        :total="total"
        :completedTotal="completedTotal"
        :percentComplete="percentComplete"
      />

      <!-- waza -->
      <div class="text-center" v-if="remaining">
        <h1 class="text-6xl font-bold sm:text-6xl xl:text-7xl">{{ kata.kanji }}</h1>
        <h2 class="text-4xl font-bold mb-4 sm:text-4xl xl:text-6xl">{{ kata.name }}</h2>

        <div class="h-20">
          <p class="text-xl" v-if="kata.ambiguous && !showDetails">
            {{ seriesByKey(kata.seriesKey).name }}
          </p>
          <p class="text-xl" v-show="showDetails">
            {{ kata.meaning }}<br />
            {{ seriesByKey(kata.seriesKey).kanji }}
            {{ seriesByKey(kata.seriesKey).name }} - {{ kata.order }}
          </p>
          <div class="pt-1" v-if="!showDetails">
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
      <div class="flex justify-between items-center" v-if="remaining">
        <BaseButton
          styleType="inverted"
          size="small"
          label="Restart"
          @button-action="handleStartOver"
        />

        <BaseButton size="large" label="Next ⇒" @button-action="handleNextKata" />
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

<script>
import { mapMutations, mapGetters } from 'vuex';
import PageFull from '@/components/PageFull.vue';
import BaseButton from '@/components/BaseButton.vue';
import ProgressBar from '@/components/ProgressBar.vue';

export default {
  name: 'Training',
  components: {
    PageFull,
    BaseButton,
    ProgressBar,
  },
  data() {
    return {
      kata: null,
      showDetails: false,
    };
  },
  /**
   * Get rand kata
   */
  created() {
    this.handleNextKata();
  },
  computed: {
    ...mapGetters('kata', [
      'seriesByKey',
      'percentComplete',
      'total',
      'completedTotal',
      'remaining',
      'nextKata',
    ]),
  },
  methods: {
    ...mapMutations('kata', ['markComplete', 'resetComplete']),

    handleStartOver() {
      this.kata = null;
      this.resetComplete();
      this.handleNextKata();
    },

    handleNextKata() {
      // reset details
      this.showDetails = false;

      // complete kata
      if (this.kata) {
        this.markComplete(this.kata);
      }

      // get next
      this.kata = this.nextKata();
    },

    handleDetails() {
      this.showDetails = true;
    },
  },
};
</script>
