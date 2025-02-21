<template>
  <div class="min-w-screen h-svh overflow-y-hidden">
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
      <div
        class="container h-[calc(100vh-8rem)] mx-auto p-8 bg-gray-100 sm:p-16 sm:h-[calc(100vh-13rem)]"
      >
        <slot />
      </div>
    </section>

    <!-- footer -->
    <footer
      class="bg-gray-900 h-12 flex justify-center items-center border-solid border-0 border-t-2 border-gray-ice"
    >
      <p class="text-gray-100">Keiko App &copy; {{ year }}</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

// not reactive
const year = new Date().getFullYear();
</script>
