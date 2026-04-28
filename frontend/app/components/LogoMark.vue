<script setup lang="ts">
const props = withDefaults(defineProps<{ size?: number }>(), { size: 22 })
</script>

<template>
  <svg class="c-logo-mark" viewBox="0 0 24 24" :width="props.size" :height="props.size">
    <circle cx="12" cy="12" r="11" class="c-logo-mark__ring" />
    <circle cx="17" cy="9" r="3" class="c-logo-mark__dot" />
  </svg>
</template>

<style lang="postcss">
:where(.c-logo-mark .c-logo-mark__ring) { fill: var(--ink); }
:where(.c-logo-mark .c-logo-mark__dot) { fill: var(--accent); }
</style>
