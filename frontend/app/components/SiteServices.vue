<script setup lang="ts">
const rows = [
  { n: '01', name: 'Frontend engineering', desc: 'Production-grade React, Next.js, Nuxt and TypeScript — accessibility, performance budgets, edge cases done right.' },
  { n: '02', name: 'Design + development', desc: 'Designing in the browser, in code. One person from Figma to deploy, with fewer handoffs to lose detail in.' },
  { n: '03', name: 'Brand establishment', desc: 'Light identity work — wordmarks, type systems, motion principles — the foundations a young company needs to look like itself.' },
  { n: '04', name: 'Mobile apps', desc: 'React Native and Expo for companion apps and lightweight products. Native feel without the native team.' },
  { n: '05', name: 'Architecture & consulting', desc: 'Frontend reviews, design-system audits, hiring help. Clear written deliverables for teams that are stuck.' },
]
</script>

<template>
  <section id="services" class="c-services">
    <div class="o-wrap">
      <div class="o-section-head">
        <div>
          <div class="o-section-head__num">§ 02 — Services</div>
        </div>
        <h2 class="o-section-head__lead">
          <WordReveal text="Five things, done thoroughly," />
          {{ ' ' }}
          <span class="u-italic"><WordReveal text="rather than everything." :delay="300" /></span>
        </h2>
      </div>

      <div class="c-services__rows">
        <div v-for="row in rows" :key="row.n" class="c-services__row">
          <span class="c-services__row-num">{{ row.n }}</span>
          <span class="c-services__row-name">{{ row.name }}</span>
          <span class="c-services__row-desc">{{ row.desc }}</span>
          <span class="c-services__row-arrow">
            <ArrowIcon :size="18" />
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="postcss">
:where(.c-services) {
  @apply relative;
  padding: 140px 0;
}

:where(.c-services__rows) {
  border-top: 1px solid var(--line);
}

:where(.c-services__row) {
  display: grid;
  grid-template-columns: 60px 1fr 1.4fr 80px;
  gap: 32px;
  padding: 32px 0;
  border-bottom: 1px solid var(--line);
  @apply items-center cursor-default relative overflow-hidden;
  transition: padding 0.5s cubic-bezier(.22,.61,.36,1);
}

:where(.c-services__row)::before {
  content: "";
  @apply absolute inset-0;
  background: var(--ink);
  transform: translateY(101%);
  transition: transform 0.6s cubic-bezier(.22,.61,.36,1);
  z-index: 0;
}

:where(.c-services__row):hover::before { transform: none; }
:where(.c-services__row):hover { color: var(--bg); padding-left: 16px; padding-right: 16px; }
:where(.c-services__row > *) { @apply relative z-[1]; }

:where(.c-services__row-num) {
  @apply font-mono;
  font-size: 12px;
  color: var(--muted);
}

:where(.c-services__row):hover .c-services__row-num { color: var(--bg); opacity: 0.6; }

:where(.c-services__row-name) {
  @apply font-headline font-medium;
  font-size: clamp(24px, 3vw, 40px);
  letter-spacing: -0.025em;
}

:where(.c-services__row-desc) {
  font-size: 15px;
  line-height: 1.55;
  color: var(--muted);
  max-width: 56ch;
}

:where(.c-services__row):hover .c-services__row-desc { color: var(--bg); opacity: 0.7; }

:where(.c-services__row-arrow) {
  @apply flex justify-end;
  transition: transform 0.4s cubic-bezier(.22,.61,.36,1);
}

:where(.c-services__row):hover .c-services__row-arrow { transform: translateX(8px); }

@media (max-width: 720px) {
  :where(.c-services__row) { grid-template-columns: 40px 1fr; gap: 16px; }
  :where(.c-services__row-desc),
  :where(.c-services__row-arrow) { @apply hidden; }
}
</style>
