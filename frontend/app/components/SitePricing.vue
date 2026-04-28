<script setup lang="ts">
const tiers = [
  {
    label: 'Sprint',
    name: 'Two-week build',
    price: '€6.4k',
    suffix: 'Fixed price · 2 weeks',
    featured: false,
    items: [
      'Marketing site or landing page',
      'Design + build, end to end',
      'Up to two rounds of revisions',
      'Deployed and handed off',
    ],
  },
  {
    label: 'Most chosen',
    name: 'Project',
    price: '€18k+',
    suffix: 'Fixed price · 4–8 weeks',
    featured: true,
    items: [
      'Full website or product surface',
      'Brand foundations, if needed',
      'Animation + motion principles',
      'CMS, analytics, deployment',
      'Two weeks of post-launch care',
    ],
  },
  {
    label: 'Ongoing',
    name: 'Embedded',
    price: '€1.6k',
    suffix: 'Per day · 1–3 days/week',
    featured: false,
    items: [
      'Embedded with your team',
      'Async by default, calls when useful',
      'Frontend, design or both',
      'Monthly minimum, no lock-in',
    ],
  },
]
</script>

<template>
  <section id="pricing" class="tight">
    <div class="wrap">
      <div class="section-head">
        <div>
          <div class="num">§ 05 — Engagement</div>
        </div>
        <h2 class="lead">
          <WordReveal text="Three ways to work" />
          {{ ' ' }}
          <span class="italic"><WordReveal text="together." :delay="240" /></span>
        </h2>
      </div>

      <RevealBlock class="pricing-grid" :stagger="true">
        <div v-for="tier in tiers" :key="tier.name" :class="['pricing-card', tier.featured ? 'featured' : '']">
          <div class="label">
            <span v-if="tier.featured" style="width:6px;height:6px;border-radius:50%;background:var(--accent);display:inline-block" />
            {{ tier.label }}
          </div>
          <div class="name">{{ tier.name }}</div>
          <div class="price">{{ tier.price }}</div>
          <div class="price-suffix">{{ tier.suffix }}</div>
          <ul>
            <li v-for="item in tier.items" :key="item">{{ item }}</li>
          </ul>
          <a
            href="#contact"
            :class="tier.featured ? 'btn' : 'btn btn-ghost'"
            :style="tier.featured ? { background: 'var(--bg)', color: 'var(--ink)' } : undefined"
          >
            <span class="dot" />
            Start a conversation
          </a>
        </div>
      </RevealBlock>
    </div>
  </section>
</template>
