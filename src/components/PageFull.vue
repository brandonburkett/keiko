<template>
  <div class="min-w-full min-h-screen overflow-y-hidden">
    <header
      class="bg-gray-900 flex justify-center items-center border-solid border-0 border-b-2 border-gray-ice"
    >
      <div class="p-4 h-40 w-auto">
        <img
          class="object-contain h-full w-auto"
          alt="Keiko Isshin"
          src="../assets/images/isshin-ice2-800.png"
        />
      </div>
    </header>
    <section class="bg-gray-100 text-gray-900">
      <div
        class="container min-h-mini-screen mx-auto px-8 pt-8 bg-gray-100 relative sm:px-16 ms:pt-16"
      >
        <slot />
      </div>
    </section>
    <footer
      class="bg-gray-900 h-10 flex justify-center items-center border-solid border-0 border-t-2 border-gray-ice"
    >
      <p class="text-gray-ice">Keiko App &copy; 2019</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'PageFull',
};
</script>
