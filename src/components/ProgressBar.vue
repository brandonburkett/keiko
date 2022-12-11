<template>
  <div
    class="w-full"
    role="progressbar"
    :aria-valuenow="completedTotal"
    aria-valuemin="0"
    :aria-valuemax="total"
  >
    <div class="w-full h-6 rounded bg-gray-100 border-gray-900 border-2 relative">
      <span
        class="absolute top-0 left-0 bg-gray-900 min-h-full transition"
        :style="{ width: percentComplete }"
      ></span>
    </div>
    <div class="flex justify-between z-10 relative">
      <span class="ml-1 font-bold">{{ percentComplete }}</span>
      <span class="mr-1 font-bold">{{ completedTotal }} / {{ total }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  total: number;
  completedTotal: number;
  percentComplete: string;
}

withDefaults(defineProps<Props>(), {});
</script>
