<template>
  <div class="min-w-screen h-screen-mobile overflow-y-hidden">
    <!-- header -->
    <header
      class="bg-gray-900 h-20 w-auto flex justify-center items-center border-solid border-0 border-b-2 border-gray-ice sm:h-40"
    >
      <img
        class="p-4 object-contain h-full w-auto"
        alt="Keiko Isshin"
        src="../assets/images/isshin-ice2-800.png"
      />
    </header>

    <!-- main content -->
    <section class="bg-gray-100 text-gray-900">
      <div class="container h-mini-screen-sm mx-auto p-8 bg-gray-100 sm:p-16 sm:h-mini-screen">
        <slot />
      </div>
    </section>

    <!-- footer -->
    <footer
      class="bg-gray-900 h-12 flex justify-center items-center border-solid border-0 border-t-2 border-gray-ice"
    >
      <p class="text-gray-100">Keiko App &copy; 2019</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'PageFull',
};
</script>
