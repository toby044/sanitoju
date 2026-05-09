<script setup lang="ts">
import { type BuildBlock, formatBuildPrice } from '~/utils/buildBlocks'

defineProps<{
  block: BuildBlock | null
  count: number
}>()

defineEmits<{
  add: []
  clear: []
}>()
</script>

<template>
  <aside v-if="!block" class="c-build-panel c-build-panel--empty">
    <div class="c-build-panel__head">
      <div>
        <h3 class="c-build-panel__title">
          Pick a <span class="u-italic">block</span>
        </h3>
        <div class="c-build-panel__cat">Preview · details · price</div>
      </div>
    </div>
    <div class="c-build-panel__mock c-build-panel__mock--empty">Click any tile to preview</div>
    <div class="c-build-panel__desc">
      Each block is a self-contained section we drop into your site. Click one to see how it renders, the time it takes, and the price.
    </div>
    <div class="c-build-panel__rows">
      <div class="c-build-panel__row">
        <span class="c-build-panel__k">In your build</span>
        <span class="c-build-panel__v">{{ count }} block{{ count === 1 ? '' : 's' }}</span>
      </div>
      <div class="c-build-panel__row">
        <span class="c-build-panel__k">Currency</span>
        <span class="c-build-panel__v">EUR</span>
      </div>
    </div>
  </aside>

  <aside v-else :key="block.id" class="c-build-panel">
    <div class="c-build-panel__head">
      <div>
        <h3 class="c-build-panel__title">{{ block.name }}</h3>
        <div class="c-build-panel__cat">{{ block.category }} · {{ block.complexity }}</div>
      </div>
      <button class="c-build-panel__close" aria-label="Close preview" @click="$emit('clear')">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
      </button>
    </div>
    <div class="c-build-panel__mock">
      <BuildWireframe :id="block.id" detailed />
    </div>
    <div class="c-build-panel__desc">{{ block.blurb }}</div>
    <div class="c-build-panel__rows">
      <div class="c-build-panel__row">
        <span class="c-build-panel__k">Base price</span>
        <span class="c-build-panel__v">{{ formatBuildPrice(block.price) }}</span>
      </div>
      <div class="c-build-panel__row">
        <span class="c-build-panel__k">Build time</span>
        <span class="c-build-panel__v">{{ block.days }} {{ block.days === 1 ? 'day' : 'days' }}</span>
      </div>
      <div class="c-build-panel__row">
        <span class="c-build-panel__k">Tier</span>
        <span class="c-build-panel__v">{{ block.complexity }}</span>
      </div>
    </div>
    <button class="c-build-panel__add" @click="$emit('add')">
      <span class="c-build-panel__add-dot" />
      Add to build · {{ formatBuildPrice(block.price) }}
    </button>
  </aside>
</template>

<style lang="postcss">
:where(.c-build-panel) {
  position: sticky;
  top: 80px;
  background: var(--bg-card, #FAF7F0);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 24px;
  min-height: 520px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
@media (max-width: 1100px) {
  :where(.c-build-panel) { position: static; }
}

:where(.c-build-panel__head) {
  @apply flex justify-between items-start gap-3;
}
:where(.c-build-panel__title) {
  font-family: var(--headline-font);
  font-weight: 500;
  font-size: 24px;
  letter-spacing: -0.025em;
  margin: 0;
}
:where(.c-build-panel__cat) {
  font-family: var(--mono-font);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  margin-top: 4px;
}

:where(.c-build-panel__close) {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: transparent;
  border: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.25s, color 0.25s, border-color 0.25s;
}
:where(.c-build-panel__close):hover {
  background: var(--ink);
  color: var(--bg);
  border-color: var(--ink);
}

:where(.c-build-panel__mock) {
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: 10px;
  aspect-ratio: 4 / 3;
  padding: 16px;
  overflow: hidden;
}
:where(.c-build-panel__mock--empty) {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--mono-font);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  text-align: center;
  background: repeating-linear-gradient(135deg, var(--bg) 0 14px, color-mix(in oklab, var(--ink) 4%, var(--bg)) 14px 15px);
}

:where(.c-build-panel__desc) {
  font-size: 14px;
  line-height: 1.55;
  color: var(--ink-soft);
}

:where(.c-build-panel__rows) {
  border-top: 1px solid var(--line);
  display: flex;
  flex-direction: column;
}
:where(.c-build-panel__row) {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid var(--line);
  font-size: 13px;
}
:where(.c-build-panel__k) {
  font-family: var(--mono-font);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}
:where(.c-build-panel__v) { font-weight: 500; }

:where(.c-build-panel__add) {
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 14px 22px;
  border-radius: 999px;
  background: var(--ink);
  color: var(--bg);
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.005em;
  border: none;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.3s, transform 0.3s;
}
:where(.c-build-panel__add):hover { background: var(--accent); }
:where(.c-build-panel__add-dot) {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  transition: background 0.3s, transform 0.3s;
}
:where(.c-build-panel__add):hover .c-build-panel__add-dot {
  background: var(--bg);
  transform: scale(1.5);
}
</style>
