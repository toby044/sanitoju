<script setup lang="ts">
const props = defineProps<{
  block: {
    sectionLabel?: string
    headlineLines?: Array<{ text: string; italic: boolean }>
    email?: string
    contactItems?: Array<{ _key: string; label: string; value?: string; sub?: string }>
  }
}>()

const lines = computed(() => props.block.headlineLines?.map(l => l.text) ?? [])
const italicIndices = computed(() =>
  props.block.headlineLines?.reduce<number[]>((acc, l, i) => l.italic ? [...acc, i] : acc, []) ?? [],
)
</script>

<template>
  <section id="contact" class="c-contact">
    <div class="o-wrap">
      <div v-if="block.sectionLabel" class="u-eyebrow c-contact__eyebrow">{{ block.sectionLabel }}</div>

      <h2 v-if="lines.length" class="c-contact__headline">
        <LineReveal :lines="lines" :italic-indices="italicIndices" />
      </h2>

      <a v-if="block.email" :href="`mailto:${block.email}`" class="c-contact__cta">
        <span class="c-contact__cta-dot" aria-hidden="true" />
        {{ block.email }}
        <ArrowIcon :size="18" />
      </a>

      <div v-if="block.contactItems?.length" class="c-contact__grid" style="margin-top: 96px;">
        <div v-for="item in block.contactItems" :key="item._key">
          <div class="c-contact__grid-label">{{ item.label }}</div>
          <div class="c-contact__grid-value">{{ item.value }}</div>
          <div class="c-contact__grid-sub">{{ item.sub }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="postcss">
:where(.c-contact) {
  @apply relative;
  background: var(--ink);
  color: var(--bg);
  padding: 160px 0 0;
}

:where(.c-contact__eyebrow) {
  color: color-mix(in oklab, var(--bg) 60%, transparent);
}

:where(.c-contact__headline) {
  @apply font-headline font-medium;
  font-size: clamp(64px, 11vw, 200px);
  letter-spacing: -0.045em;
  line-height: 0.88;
  margin: 32px 0 64px;
}

:where(.c-contact__cta) {
  @apply inline-flex items-center gap-[18px] font-headline font-medium cursor-pointer;
  font-size: 22px;
  letter-spacing: -0.015em;
  padding: 24px 36px;
  border: 1px solid color-mix(in oklab, var(--bg) 22%, transparent);
  border-radius: 999px;
  background: transparent;
  color: var(--bg);
  transition: background 0.4s, color 0.4s, border-color 0.4s;
}

:where(.c-contact__cta):hover {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

:where(.c-contact__cta-dot) {
  @apply rounded-full shrink-0;
  width: 10px;
  height: 10px;
  background: var(--accent);
  transition: background 0.3s, transform 0.3s;
}

:where(.c-contact__cta):hover .c-contact__cta-dot {
  background: #fff;
  transform: scale(1.4);
}

:where(.c-contact__grid) {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 32px;
  border-top: 1px solid color-mix(in oklab, var(--bg) 18%, transparent);
  padding-top: 40px;
  margin-bottom: 96px;
}

@media (max-width: 900px) {
  :where(.c-contact__grid) { grid-template-columns: 1fr; gap: 24px; }
}

:where(.c-contact__grid-label) {
  @apply font-mono uppercase;
  font-size: 11px;
  letter-spacing: 0.14em;
  color: color-mix(in oklab, var(--bg) 60%, transparent);
  margin-bottom: 16px;
}

:where(.c-contact__grid-value) {
  @apply font-headline font-medium;
  font-size: 24px;
  letter-spacing: -0.02em;
}

:where(.c-contact__grid-sub) {
  font-size: 14px;
  color: color-mix(in oklab, var(--bg) 70%, transparent);
  margin-top: 6px;
}
</style>
