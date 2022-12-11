<template>
  <div class="min-w-screen h-mobile-screen overflow-y-hidden">
    <!-- header -->
    <header
      class="bg-gray-900 h-20 w-auto flex justify-center items-center border-solid border-0 border-b-2 border-gray-ice sm:h-40"
    >
      <RouterLink to="/" class="p-4 h-full w-3/6">
        <img
          class="object-contain h-full w-auto mx-auto"
          alt="Keiko Isshin"
          src="../assets/images/isshin-ice2-800.png"
        />
      </RouterLink>
    </header>

    <!-- main content -->
    <section class="bg-gray-100 text-gray-900">
      <div class="container h-body-screen-sm mx-auto p-8 bg-gray-100 sm:p-16 sm:h-body-screen">
        <slot />
      </div>
    </section>

    <!-- footer -->
    <footer
      class="bg-gray-900 h-12 flex justify-center items-center border-solid border-0 border-t-2 border-gray-ice"
    >
      <p class="text-gray-100">Keiko App &copy; 2023</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
