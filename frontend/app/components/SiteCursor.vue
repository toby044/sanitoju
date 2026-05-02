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
  hovering.value = !!target.closest('a, button, .c-work__card, .c-services__row, .c-writing__row, .c-contact__cta')
})
</script>

<template>
  <div
    class="c-cursor"
    :class="{ 'is-hover': hovering }"
    :style="{ left: `${x}px`, top: `${y}px` }"
  />
</template>

<style lang="postcss">
:where(.c-cursor) {
  @apply fixed top-0 left-0 rounded-full pointer-events-none z-[9999];
  width: 12px;
  height: 12px;
  background: var(--accent);
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
  transition: width 0.25s, height 0.25s, background 0.25s;
}

:where(.c-cursor.is-hover) {
  width: 56px;
  height: 56px;
}
</style>
