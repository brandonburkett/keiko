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
      <div class="mt-8">
        <div class="flex flex-col justify-center items-center">
          <ButtonLink size="xlarge" label="Begin Training" to="/training" />
        </div>
      </div>
    </div>
  </PageFull>
</template>

<script>
// @ is an alias to /src
import PageFull from '@/components/PageFull.vue';
import ButtonLink from '@/components/ButtonLink.vue';

export default {
  name: 'Home',
  components: {
    PageFull,
    ButtonLink,
  },
};
</script>
