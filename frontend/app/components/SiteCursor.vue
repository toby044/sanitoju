<script setup lang="ts">
import { useMouse, useEventListener } from '@vueuse/core'

const { x, y } = useMouse({ type: 'client' })
const hovering = ref(false)

onMounted(() => {
  document.body.classList.add('cursor-active')
})
onUnmounted(() => {
  document.body.classList.remove('cursor-active')
})

useEventListener(document, 'mouseover', (e: MouseEvent) => {
  const target = e.target as HTMLElement
  hovering.value = !!target.closest('a, button, .work-card, .service-row, .writing-row, .contact-cta')
})
</script>

<template>
  <div
    class="cursor"
    :class="{ hover: hovering }"
    :style="{ left: `${x}px`, top: `${y}px` }"
  />
</template>
