<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@tailwind base;

@tailwind components;

@tailwind utilities;

.transition {
  transition: 0.3s;
}
</style>

<script>
export default {
  name: 'App',
  mounted() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
  },
};
</script>
