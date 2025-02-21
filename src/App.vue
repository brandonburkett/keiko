<template>
  <RouterView />
</template>

<style>
@import 'tailwindcss';

.transition {
  transition: 0.3s;
}
</style>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue';
import { RouterView } from 'vue-router';

onMounted(() => {
  const setFullHeight = () => {
    // let vh = window.innerHeight * 0.01;
    // document.documentElement.style.setProperty('--vh', `${vh}px`);
    const vh = window.innerHeight;
    // console.log('setFullHeight', vh);
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  setFullHeight();

  // iOS sometimes has a blip when opening the very first time
  nextTick(() => {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    document.dispatchEvent(event);
  });

  // trigger height var update on events
  window.addEventListener('resize', setFullHeight);
  window.addEventListener('orientationchange', setFullHeight);
});
</script>
