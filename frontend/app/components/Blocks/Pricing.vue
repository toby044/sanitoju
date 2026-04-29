<script setup lang="ts">
defineProps<{
  block: {
    sectionLabel?: string
    headlinePart1?: string
    headlinePart2?: string
    tiers?: Array<{
      _key: string
      label?: string
      name: string
      price?: string
      suffix?: string
      featured?: boolean
      items?: string[]
    }>
  }
}>()
</script>

<template>
  <section id="pricing" class="c-pricing">
    <div class="o-wrap">
      <div class="o-section-head">
        <div>
          <div class="o-section-head__num">{{ block.sectionLabel }}</div>
        </div>
        <h2 class="o-section-head__lead">
          <WordReveal v-if="block.headlinePart1" :text="block.headlinePart1" />
          {{ ' ' }}
          <span v-if="block.headlinePart2" class="u-italic">
            <WordReveal :text="block.headlinePart2" :delay="240" />
          </span>
        </h2>
      </div>

      <RevealBlock v-if="block.tiers?.length" class="c-pricing__grid" :stagger="true">
        <div
          v-for="tier in block.tiers"
          :key="tier._key"
          :class="['c-pricing__card', tier.featured ? 'c-pricing__card--featured' : '']"
        >
          <div class="c-pricing__card-label">
            <span v-if="tier.featured" class="c-pricing__card-label-dot" aria-hidden="true" />
            {{ tier.label }}
          </div>
          <div class="c-pricing__card-name">{{ tier.name }}</div>
          <div class="c-pricing__card-price">{{ tier.price }}</div>
          <div class="c-pricing__card-suffix">{{ tier.suffix }}</div>
          <ul v-if="tier.items?.length" class="c-pricing__card-items">
            <li v-for="item in tier.items" :key="item">{{ item }}</li>
          </ul>
          <Button
            as="a"
            href="#contact"
            :variant="tier.featured ? 'default' : 'ghost'"
            :style="tier.featured ? { background: 'var(--bg)', color: 'var(--ink)' } : undefined"
          >
            Start a conversation
          </Button>
        </div>
      </RevealBlock>
    </div>
  </section>
</template>

<style lang="postcss">
:where(.c-pricing) {
  @apply relative;
  padding: 96px 0;
}

:where(.c-pricing__grid) {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 900px) {
  :where(.c-pricing__grid) { grid-template-columns: 1fr; }
}

:where(.c-pricing__card) {
  @apply flex flex-col relative overflow-hidden;
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 40px 32px;
  transition: border-color 0.4s, transform 0.4s;
}

:where(.c-pricing__card):hover { border-color: var(--ink); }

:where(.c-pricing__card--featured) {
  background: var(--ink);
  color: var(--bg);
  border-color: var(--ink);
}

:where(.c-pricing__card--featured):hover { background: var(--accent); }

:where(.c-pricing__card-label) {
  @apply font-mono uppercase flex items-center gap-2;
  font-size: 11px;
  letter-spacing: 0.14em;
  color: var(--muted);
  margin-bottom: 24px;
}

:where(.c-pricing__card--featured .c-pricing__card-label) { color: var(--accent); }
:where(.c-pricing__card--featured):hover .c-pricing__card-label { color: var(--bg); }

:where(.c-pricing__card-label-dot) {
  @apply rounded-full inline-block shrink-0;
  width: 6px;
  height: 6px;
  background: var(--accent);
}

:where(.c-pricing__card-name) {
  @apply font-headline font-medium;
  font-size: 28px;
  letter-spacing: -0.025em;
  margin-bottom: 8px;
}

:where(.c-pricing__card-price) {
  @apply font-headline font-medium;
  font-size: 56px;
  letter-spacing: -0.04em;
  line-height: 1;
  margin: 24px 0 8px;
}

:where(.c-pricing__card-suffix) {
  font-size: 14px;
  color: var(--muted);
  margin-bottom: 32px;
}

:where(.c-pricing__card--featured .c-pricing__card-suffix) {
  color: color-mix(in oklab, var(--bg) 70%, transparent);
}

:where(.c-pricing__card-items) {
  @apply list-none p-0 flex flex-col flex-grow;
  margin: 0 0 32px;
  gap: 12px;
}

:where(.c-pricing__card-items li) {
  font-size: 14px;
  line-height: 1.5;
  @apply flex gap-[10px] items-start;
  border-top: 1px solid var(--line);
  padding-top: 12px;
}

:where(.c-pricing__card--featured .c-pricing__card-items li) {
  border-top-color: color-mix(in oklab, var(--bg) 14%, transparent);
}

:where(.c-pricing__card-items li)::before {
  content: "+";
  @apply font-mono shrink-0;
  color: var(--accent);
  font-size: 14px;
}

:where(.c-pricing__card--featured):hover .c-pricing__card-items li::before {
  color: var(--bg);
}
</style>
