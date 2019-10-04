<template>
  <PageFull>
    <header
      class="bg-gray-300 flex justify-center items-center border-solid border-0 border-b-2 border-gray-900"
    >
      <div class="p-4 h-40 w-auto">
        <img
          class="object-contain h-full w-auto"
          alt="Keiko Isshin"
          src="../assets/images/isshin-800.png"
        />
      </div>
    </header>

    <section class="container min-h-mini-screen mx-auto px-16">
      <!-- CTAs -->
      <div>
        <KeikoButton styleType="inverted" label="Restart Keiko" />
        <KeikoButton styleType="inverted" size="medium" label="Restart Keiko" />
        <KeikoButton styleType="standard" size="large" label="Standard Button" />
      </div>
    </section>

    <footer
      class="bg-gray-900 h-10 flex justify-center items-center border-solid border-0 border-t-2 border-gray-300"
    >
      <p class="text-gray-100">Keiko App &copy; 2019</p>
    </footer>
  </PageFull>
</template>

<script>
// @ is an alias to /src
import PageFull from '@/components/PageFull.vue';
import KeikoButton from '@/components/KeikoButton.vue';

export default {
  name: 'home',
  components: {
    PageFull,
    KeikoButton,
  },
};
</script>
