<script setup lang="ts">
import { type BuildBlock, formatBuildPrice } from '~/utils/buildBlocks'

const props = defineProps<{
  block: BuildBlock
  index: number
  uid: string
  dragging: boolean
}>()

const emit = defineEmits<{
  remove: []
  dragStart: [event: PointerEvent, el: HTMLElement]
}>()

const chipEl = ref<HTMLElement | null>(null)

const handlePointerDown = (e: PointerEvent) => {
  if (e.button !== 0) return
  if ((e.target as HTMLElement)?.closest('.c-build-chip__remove')) return
  if (chipEl.value) emit('dragStart', e, chipEl.value)
}

const handleRemove = (e: MouseEvent) => {
  e.stopPropagation()
  emit('remove')
}
</script>

<template>
  <div
    ref="chipEl"
    :class="['c-build-chip', dragging && 'c-build-chip--dragging']"
    @pointerdown="handlePointerDown"
  >
    <span class="c-build-chip__idx">{{ String(index + 1).padStart(2, '0') }}</span>
    <span class="c-build-chip__name">{{ block.name }}</span>
    <span class="c-build-chip__price">{{ formatBuildPrice(block.price) }}</span>
    <button class="c-build-chip__remove" aria-label="Remove" @click="handleRemove">
      <svg viewBox="0 0 12 12">
        <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
      </svg>
    </button>
  </div>
</template>

<style lang="postcss">
:where(.c-build-chip) {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 9px 14px 9px 12px;
  background: var(--bg-card, #FAF7F0);
  border: 1px solid var(--line);
  border-radius: 999px;
  font-size: 13px;
  letter-spacing: -0.005em;
  cursor: grab;
  transition: border-color 0.25s, background 0.25s, transform 0.35s cubic-bezier(0.22, 0.61, 0.36, 1);
  position: relative;
  animation: c-build-chip-in 0.45s cubic-bezier(0.22, 1.2, 0.36, 1);
}
:where(.c-build-chip):hover { border-color: var(--ink); }
:where(.c-build-chip--dragging) { opacity: 0.4; cursor: grabbing; }

:where(.c-build-chip--placeholder) {
  background: var(--accent-soft);
  border: 1px dashed var(--accent);
  color: var(--accent);
  animation: none;
}

:where(.c-build-chip__idx) {
  font-family: var(--mono-font);
  font-size: 10.5px;
  letter-spacing: 0.1em;
  color: var(--muted);
  background: var(--bg);
  border-radius: 999px;
  padding: 2px 7px;
  min-width: 26px;
  text-align: center;
}
:where(.c-build-chip__name) { font-weight: 500; }
:where(.c-build-chip__price) {
  font-family: var(--mono-font);
  font-size: 11.5px;
  letter-spacing: 0.04em;
  color: var(--muted);
}

:where(.c-build-chip__remove) {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--muted);
  transition: background 0.2s, color 0.2s;
  padding: 0;
  margin-left: -4px;
}
:where(.c-build-chip__remove):hover {
  background: var(--ink);
  color: var(--bg);
}
:where(.c-build-chip__remove svg) { width: 10px; height: 10px; }

@keyframes c-build-chip-in {
  0% { transform: scale(0.4) translateY(20px); opacity: 0; }
  60% { transform: scale(1.08) translateY(-2px); opacity: 1; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
}
</style>
