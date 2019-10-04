<template>
  <button
    :type="type"
    :class="styles"
    aria-live="polite"
    @click.prevent="$emit('submit-action', $event)"
  >
    {{ loadingLabel }}
  </button>
</template>

<script>
export default {
  name: 'KeikoButton',
  props: {
    type: {
      type: String,
      default: 'submit',
    },
    label: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    styleType: {
      type: String,
      default: 'standard',
      validator: val => ['standard', 'inverted'].includes(val),
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
          'border-2 border-gray-800 bg-gray-800 text-gray-100 font-semibold rounded hover:bg-gray-900',
        ];
      } else if (this.styleType === 'inverted') {
        classList = [
          'border-2 border-gray-800 bg-transparent text-gray-800 font-semibold rounded hover:bg-gray-200',
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

    loadingLabel() {
      return this.loading ? 'Loading...' : this.label;
    },
  },
};
</script>
