<script setup lang="ts">
const props = defineProps<{
  block: {
    eyebrow?: string;
    headlineLines?: Array<{ text: string; italic: boolean }>;
    practiceLabel?: string;
    practiceText?: string;
    currentLabel?: string;
    currentText?: string;
    statusText?: string;
  };
}>();

const lines = computed(
  () => props.block.headlineLines?.map((l) => l.text) ?? [],
);
const italicIndices = computed(
  () =>
    props.block.headlineLines?.reduce<number[]>(
      (acc, l, i) => (l.italic ? [...acc, i] : acc),
      [],
    ) ?? [],
);
</script>

<template>
  <section class="c-hero" id="top">
    <div class="o-wrap">
      <div v-if="block.eyebrow" class="c-hero__eyebrow c-reveal is-in">
        <span class="c-hero__pulse" aria-hidden="true" />
        <span class="u-eyebrow">{{ block.eyebrow }}</span>
      </div>

      <h1 v-if="lines.length" class="c-hero__headline u-h-display">
        <LineReveal
          :lines="lines"
          :italic-indices="italicIndices"
          :delay-base="120"
        />
      </h1>

      <div class="c-hero__meta">
        <RevealBlock
          v-if="block.practiceLabel || block.practiceText"
          class="c-hero__cell"
          :delay="500"
        >
          <div class="c-hero__cell-label">{{ block.practiceLabel }}</div>
          <div class="c-hero__cell-val">{{ block.practiceText }}</div>
        </RevealBlock>
        <RevealBlock
          v-if="block.currentLabel || block.currentText"
          class="c-hero__cell"
          :delay="620"
        >
          <div class="c-hero__cell-label">{{ block.currentLabel }}</div>
          <div class="c-hero__cell-val">{{ block.currentText }}</div>
        </RevealBlock>
        <RevealBlock class="c-hero__cell" :delay="740">
          <div class="c-hero__cell-label">Local time</div>
          <div class="c-hero__cell-val"><LiveClock /> · 56°N, 10°E</div>
        </RevealBlock>
      </div>
    </div>

    <div v-if="block.statusText" class="c-hero__status">
      <span class="c-hero__status-dot" aria-hidden="true" />
      {{ block.statusText }}
    </div>
  </section>
</template>

<style lang="postcss">
:where(.c-hero) {
  @apply relative overflow-hidden pt-180px pb-120px;
}

:where(.c-hero__eyebrow) {
  @apply flex items-center gap-[14px] mb-56px;
}

:where(.c-hero__pulse) {
  @apply relative shrink-0 rounded-full bg-accent w-8px h-8px;
}

:where(.c-hero__pulse)::after {
  content: "";
  @apply absolute rounded-full border border-accent -inset-4px;
  animation: c-hero-pulse 2s ease-out infinite;
}

@keyframes c-hero-pulse {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}

:where(.c-hero__headline) {
  @apply text-[clamp(56px,11vw,184px)];
}

:where(.c-hero__meta) {
  @apply grid grid-cols-3 gap-48px mt-80px pt-28px;
  border-top: 1px solid var(--line);
}

@media (max-width: 720px) {
  :where(.c-hero__meta) { @apply grid-cols-1 gap-24px; }
}

:where(.c-hero__cell-label) {
  @apply font-mono uppercase text-11px tracking-[0.14em] text-[--muted] mb-12px;
}

:where(.c-hero__cell-val) {
  @apply text-16px tracking-[-0.01em] leading-[1.4];
}

:where(.c-hero__status) {
  @apply absolute flex items-center gap-3 z-[5] right-48px top-130px rounded-14px py-14px px-18px text-13px;
  border: 1px solid var(--line);
  background: color-mix(in oklab, var(--bg) 92%, var(--ink));
  animation: c-hero-floaty 6s ease-in-out infinite;
}

@keyframes c-hero-floaty {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

:where(.c-hero__status-dot) {
  @apply rounded-full shrink-0 w-8px h-8px bg-[#36c46b] shadow-[0_0_12px_#36c46b];
}

@media (max-width: 1100px) {
  :where(.c-hero__status) {
    @apply hidden;
  }
}
</style>
