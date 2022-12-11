<template>
  <RouterLink :to="to" :class="styles">
    {{ label }}
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

interface Props {
  label: string;
  to: string | object;
  styleType: string;
  size: string;
  classes: string;
};

const props = withDefaults(defineProps<Props>(), {
  label: '',
  to: '',
  styleType: 'standard',
  size: 'small',
  classes: '',
});

const styles = computed(() => {
  let classList = [];

  // types
  if (props.styleType === 'standard') {
    classList = [
      'border-2 border-gray-900 bg-gray-900 text-gray-ice font-semibold rounded hover:bg-gray-800 transition',
    ];
  } else if (props.styleType === 'inverted') {
    classList = [
      'border-2 border-gray-900 bg-gray-100 text-gray-900 font-semibold rounded hover:bg-white transition',
    ];
  }

  // center text
  classList.push('text-center');

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

  if (props.classes) {
    classList.push(props.classes);
  }

  return classList.join(' ');
})

</script>