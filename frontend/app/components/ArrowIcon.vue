<script setup lang="ts">
const props = withDefaults(defineProps<{ size?: number }>(), { size: 14 })
</script>

<template>
  <svg class="arrow" :width="props.size" :height="props.size" viewBox="0 0 14 14" fill="none">
    <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>
