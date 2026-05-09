<script setup lang="ts">
import { type BuildBlock, formatBuildPrice } from '~/utils/buildBlocks'

const props = defineProps<{
  block: BuildBlock
  selected: boolean
  dragging: boolean
}>()

const emit = defineEmits<{
  select: []
  add: []
  dragStart: [event: PointerEvent, el: HTMLElement]
}>()

const cardEl = ref<HTMLElement | null>(null)

const handlePointerDown = (e: PointerEvent) => {
  if (e.button !== 0) return
  if (cardEl.value) emit('dragStart', e, cardEl.value)
}

const handleAdd = (e: MouseEvent) => {
  e.stopPropagation()
  emit('add')
}
</script>

<template>
  <div
    ref="cardEl"
    :class="['c-build-card', selected && 'c-build-card--selected', dragging && 'c-build-card--dragging']"
    @click="emit('select')"
    @pointerdown="handlePointerDown"
  >
    <div class="c-build-card__head">
      <div class="c-build-card__name">{{ block.name }}</div>
      <div class="c-build-card__price">{{ formatBuildPrice(block.price) }}</div>
    </div>
    <div class="c-build-card__frame">
      <BuildWireframe :id="block.id" />
    </div>
    <div class="c-build-card__foot">
      <span>{{ block.category }} · {{ block.complexity }}</span>
      <button class="c-build-card__add" :aria-label="`Add ${block.name}`" @click="handleAdd" @pointerdown.stop>
        Add
        <ArrowIcon :size="11" />
      </button>
    </div>
  </div>
</template>

<style lang="postcss">
:where(.c-build-card) {
  position: relative;
  background: var(--bg-card, #FAF7F0);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 18px;
  cursor: grab;
  transition: border-color 0.3s, transform 0.35s cubic-bezier(0.22, 0.61, 0.36, 1), box-shadow 0.3s, background 0.25s;
  user-select: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 220px;
}
:where(.c-build-card):hover {
  border-color: var(--ink);
  transform: translateY(-2px);
  box-shadow: 0 14px 30px -22px rgba(14, 14, 14, 0.35);
}
:where(.c-build-card--selected) {
  border-color: var(--ink);
  box-shadow: 0 0 0 1px var(--ink);
}
:where(.c-build-card--dragging) {
  cursor: grabbing;
  opacity: 0.35;
  transform: scale(0.96);
}
:where(.c-build-card):active { cursor: grabbing; }

:where(.c-build-card__head) {
  @apply flex items-center justify-between gap-2;
}
:where(.c-build-card__name) {
  font-family: var(--headline-font);
  font-weight: 500;
  font-size: 17px;
  letter-spacing: -0.015em;
}
:where(.c-build-card__price) {
  font-family: var(--mono-font);
  font-size: 12px;
  letter-spacing: 0.04em;
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 4px 10px;
  white-space: nowrap;
}

:where(.c-build-card__frame) {
  flex: 1;
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 12px;
  overflow: hidden;
  min-height: 110px;
}

:where(.c-build-card__foot) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--mono-font);
  font-size: 10.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}
:where(.c-build-card__add) {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  cursor: pointer;
  font: inherit;
  font-family: var(--mono-font);
  font-size: 10.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink);
  opacity: 0.55;
  transition: opacity 0.25s, transform 0.35s cubic-bezier(0.22, 0.61, 0.36, 1);
}
:where(.c-build-card):hover .c-build-card__add {
  opacity: 1;
  transform: translateX(2px);
}
</style>
