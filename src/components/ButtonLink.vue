<template>
  <router-link :to="to" :class="styles">
    {{ label }}
  </router-link>
</template>

<script>
export default {
  name: 'ButtonLink',
  props: {
    label: {
      type: String,
      default: '',
    },
    to: {
      type: [String, Object],
      default: '',
    },
    styleType: {
      type: String,
      default: 'standard',
      validator: val => ['standard', 'inverted', 'link'].includes(val),
    },
    size: {
      type: String,
      default: 'small',
      validator: val => ['small', 'medium', 'large'].includes(val),
    },
  },
  computed: {
    styles() {
      let classList = [];

      // types
      if (this.styleType === 'standard') {
        classList = [
          'border-2 border-gray-900 bg-gray-900 text-gray-ice font-semibold rounded hover:bg-gray-800 transition',
        ];
      } else if (this.styleType === 'inverted') {
        classList = [
          'border-2 border-gray-900 bg-gray-100 text-gray-900 font-semibold rounded hover:bg-white transition',
        ];
      }

      // sizes
      if (this.size === 'small') {
        classList.push('py-1 px-2 text-sm');
      } else if (this.size === 'medium') {
        classList.push('py-2 px-5');
      } else if (this.size === 'large') {
        classList.push('py-3 px-6 text-xl');
      }

      return classList.join(' ');
    },
  },
};
</script>
