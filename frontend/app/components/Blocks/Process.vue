<script setup lang="ts">
defineProps<{
  block: {
    sectionLabel?: string
    headline?: string
    steps?: Array<{ _key: string; name: string; description?: string; tag?: string }>
  }
}>()
</script>

<template>
  <section id="process" class="c-process">
    <div class="o-wrap">
      <div class="o-section-head">
        <div>
          <div class="o-section-head__num c-process__eyebrow-num">{{ block.sectionLabel }}</div>
        </div>
        <h2 v-if="block.headline" class="o-section-head__lead c-process__lead">
          <WordReveal :text="block.headline" />
        </h2>
      </div>

      <RevealBlock v-if="block.steps?.length" class="c-process__steps" :stagger="true">
        <div v-for="(step, i) in block.steps" :key="step._key" class="c-process__step">
          <div class="c-process__step-num">{{ String(i + 1).padStart(2, '0') }}</div>
          <div class="c-process__step-name">{{ step.name }}</div>
          <div class="c-process__step-desc">{{ step.description }}</div>
          <div class="c-process__step-tag">{{ step.tag }}</div>
        </div>
      </RevealBlock>
    </div>
  </section>
</template>

<style lang="postcss">
:where(.c-process) {
  @apply relative;
  padding: 140px 0;
  background: var(--ink);
  color: var(--bg);
}

:where(.c-process__eyebrow-num) {
  color: color-mix(in oklab, var(--bg) 60%, transparent);
}

:where(.c-process__lead) {
  color: var(--bg);
}

:where(.c-process__steps) {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: color-mix(in oklab, var(--bg) 14%, transparent);
  border-top: 1px solid color-mix(in oklab, var(--bg) 14%, transparent);
  border-bottom: 1px solid color-mix(in oklab, var(--bg) 14%, transparent);
}

@media (max-width: 900px) { :where(.c-process__steps) { grid-template-columns: 1fr 1fr; } }
@media (max-width: 600px) { :where(.c-process__steps) { grid-template-columns: 1fr; } }

:where(.c-process__step) {
  @apply flex flex-col relative;
  background: var(--ink);
  padding: 40px 24px;
  min-height: 360px;
  transition: background 0.4s;
}

:where(.c-process__step):hover { background: #1a1a1a; }

:where(.c-process__step-num) {
  @apply font-mono;
  font-size: 11px;
  letter-spacing: 0.14em;
  color: color-mix(in oklab, var(--bg) 60%, transparent);
  margin-bottom: 80px;
}

:where(.c-process__step-name) {
  @apply font-headline font-medium;
  font-size: 32px;
  letter-spacing: -0.025em;
  line-height: 1;
  margin-bottom: 16px;
}

:where(.c-process__step-desc) {
  font-size: 14px;
  line-height: 1.55;
  color: color-mix(in oklab, var(--bg) 70%, transparent);
  margin-bottom: auto;
}

:where(.c-process__step-tag) {
  @apply font-mono uppercase;
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--accent);
  margin-top: 32px;
}
</style>
