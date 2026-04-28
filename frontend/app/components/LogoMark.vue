<script setup lang="ts">
const props = withDefaults(defineProps<{ size?: number }>(), { size: 22 })
</script>

<template>
  <svg class="logo-mark" viewBox="0 0 24 24" :width="props.size" :height="props.size">
    <circle cx="12" cy="12" r="11" class="a" />
    <circle cx="17" cy="9" r="3" class="b" />
  </svg>
</template>
