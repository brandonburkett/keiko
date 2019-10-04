<template>
  <PageFull>
    <div class="w-100 m-0 mt-10 sm:w-4/5 sm:mx-auto text-center">
      <h1 class="text-6xl font-bold">{{ kata.kanji }}</h1>
      <h2 class="text-4xl font-bold mb-4">{{ kata.name }}</h2>
      <p class="text-xl" v-show="showDetails">test</p>
      <Button
        styleType="inverted"
        size="small"
        label="Details"
        @button-action="handleDetails"
        v-if="!showDetails"
      />
    </div>

    <!-- Progress  -->
    <div class="absolute bottom-0 left-0 mb-10 px-8 min-w-full">
      <div class="flex justify-between items-center">
        <Button
          styleType="inverted"
          size="small"
          label="Restart"
          @button-action="handleStartOver"
        />

        <Button size="large" label="Next Kata ⇒" @button-action="handleNextKata" />
      </div>
    </div>
  </PageFull>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import PageFull from '@/components/PageFull.vue';
import Button from '@/components/Button.vue';

export default {
  name: 'Training',
  components: {
    PageFull,
    Button,
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
    this.kata = this.nextKata;
  },
  computed: {
    ...mapGetters('kata', ['getSeries', 'completedTotal', 'remaining', 'nextKata']),
  },
  methods: {
    ...mapMutations('kata', ['markComplete']),

    handleStartOver() {
      console.log('start over');
    },

    handleNextKata() {
      console.log('next kata');
    },

    handleDetails() {
      this.showDetails = true;
    },
  },
};
</script>
