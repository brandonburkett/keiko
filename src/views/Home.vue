<template>
  <PageFull>
    <div class="flex flex-col h-full w-100 m-0 sm:w-5/6 sm:mx-auto lg:w-3/4 xl:w-1/2">
      <div>
        <h1 class="text-4xl font-bold text-center sm:text-6xl">Keiko Keiko Keiko</h1>
        <p class="text-justify my-4">
          Welcome to Keiko, the app to help train MJER kata. Click begin to work through each
          technique, chosen at random, to test your knowledge and push yourself forward!
        </p>
      </div>

      <!-- CTAs -->
      <div class="mt-8 w-64 mx-auto">
        <div class="flex flex-col justify-center items-center">
          <BaseSelect
            name="series"
            label="Select Series"
            :options="seriesOptions"
            v-model="form.series"
            :value="form.series"
          />

          <div class="mt-4 w-full">
            <BaseSelect
              name="order"
              label="Select Order"
              :options="seriesOrder"
              v-model="form.order"
              :value="form.order"
            />
          </div>

          <div class="mt-8 w-full">
            <ButtonLink
              size="xlarge"
              label="Begin Training"
              :to="`/training?series=${form.series}&order=${form.order}`"
              classes="block w-full"
            />
          </div>
        </div>
      </div>
    </div>
  </PageFull>
</template>

<script>
// @ is an alias to /src
import PageFull from '@/components/PageFull.vue';
import ButtonLink from '@/components/ButtonLink.vue';
import BaseSelect from '@/components/BaseSelect.vue';

export default {
  name: 'Home',
  components: {
    PageFull,
    ButtonLink,
    BaseSelect,
  },
  data() {
    return {
      form: {
        series: 'all',
        order: 'random',
      },
    };
  },
  computed: {
    seriesOptions() {
      return [
        {
          key: 'all',
          value: 'all',
          name: 'All',
          kanji: '',
        },
        ...this.$store.getters['kata/seriesList'],
      ];
    },
    seriesOrder() {
      return [
        {
          key: 'sequential',
          value: 'sequential',
          name: 'Sequential',
        },
        {
          key: 'random',
          value: 'random',
          name: 'Random',
        },
      ];
    },
  },
};
</script>
