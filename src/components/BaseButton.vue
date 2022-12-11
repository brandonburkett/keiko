<template>
  <button
    :type="type"
    :class="styles"
    aria-live="polite"
    @click.prevent="$emit('button-action', $event)"
  >
    {{ loadingLabel }}
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  type: string;
  label: string;
  loading: boolean;
  linkTo: string;
  styleType: string;
  size: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'submit',
  label: '',
  linkTo: '',
  styleType: 'standard',
  size: 'small',
});

const styles = computed(() => {
  let classList = [];

  // types
  if (props.styleType === 'standard') {
    classList = [
      'border-2 border-gray-900 bg-gray-900 text-gray-100 font-semibold rounded hover:bg-gray-800 transition',
    ];
  } else if (props.styleType === 'inverted') {
    classList = [
      'border-2 border-gray-900 bg-gray-100 text-gray-900 font-semibold rounded hover:bg-white transition',
    ];
  }

  // sizes
  if (props.size === 'small') {
    classList.push('py-1 px-2 text-sm');
  } else if (props.size === 'medium') {
    classList.push('py-2 px-5');
  } else if (props.size === 'large') {
    classList.push('py-3 px-6 text-xl');
  } else if (props.size === 'xlarge') {
    classList.push('py-4 px-8 text-2xl');
  }

  return classList.join(' ');
});

const loadingLabel = computed(() => (props.loading ? 'Loading...' : props.label));
</script>
