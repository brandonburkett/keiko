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
    const setFullHeight = () => {
      // let vh = window.innerHeight * 0.01;
      // document.documentElement.style.setProperty('--vh', `${vh}px`);
      const vh = window.innerHeight;
      // console.log('setFullHeight', vh);
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setFullHeight();

    // iOS sometimes has a blip when opening the very first time
    this.$nextTick(() => {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', true, false);
      document.dispatchEvent(event);
    });

    // trigger height var update on events
    window.addEventListener('resize', setFullHeight);
    window.addEventListener('orientationchange', setFullHeight);
  },
};
</script>
