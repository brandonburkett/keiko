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
      <!--      <div class="fw-100 m-0 mt-8 sm:w-4/5 sm:mx-auto text-center" v-if="remaining > 0">-->
      <div class="text-center">
        <h1 class="text-6xl font-bold">{{ kata.kanji }}</h1>
        <h2 class="text-4xl font-bold mb-4">{{ kata.name }}</h2>
        <p class="text-xl mb-2" v-if="kata.ambiguous && !showDetails">
          {{ getSeries(kata.seriesKey).name }}
        </p>
        <p class="text-xl" v-show="showDetails">
          {{ kata.meaning }}<br />
          {{ getSeries(kata.seriesKey).kanji }}
          {{ getSeries(kata.seriesKey).name }} - {{ kata.order }}
        </p>
        <Button
          styleType="inverted"
          size="small"
          label="Details"
          @button-action="handleDetails"
          v-if="!showDetails"
        />
      </div>

      <!-- CTAs  -->
      <div class="flex justify-between items-center" v-if="remaining">
        <Button
          styleType="inverted"
          size="small"
          label="Restart"
          @button-action="handleStartOver"
        />

        <Button size="large" label="Next ⇒" @button-action="handleNextKata" />
      </div>
      <div class="flex justify-center items-center" v-else>
        <Button
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
import Button from '@/components/Button.vue';
import ProgressBar from '@/components/ProgressBar.vue';

export default {
  name: 'Training',
  components: {
    PageFull,
    Button,
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
      'getSeries',
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
