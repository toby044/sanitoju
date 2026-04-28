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
  <section id="services">
    <div class="wrap">
      <div class="section-head">
        <div>
          <div class="num">§ 02 — Services</div>
        </div>
        <h2 class="lead">
          <WordReveal text="Five things, done thoroughly," />
          {{ ' ' }}
          <span class="italic"><WordReveal text="rather than everything." :delay="300" /></span>
        </h2>
      </div>

      <div class="service-rows">
        <div v-for="row in rows" :key="row.n" class="service-row">
          <span class="num">{{ row.n }}</span>
          <span class="name">{{ row.name }}</span>
          <span class="desc">{{ row.desc }}</span>
          <span class="arrow">
            <ArrowIcon :size="18" />
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
