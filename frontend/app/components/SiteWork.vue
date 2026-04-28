<script setup lang="ts">
const items = [
  { span: 7, tag: '01 / Brand & web', title: 'Norrhaus Atelier', year: '2025', type: 'Furniture studio', bg: 'c-work__thumb-art--1' },
  { span: 5, tag: '02 / Product', title: 'Folio Capital', year: '2025', type: 'Fintech dashboard', bg: 'c-work__thumb-art--2' },
  { span: 5, tag: '03 / Identity', title: 'Lyse — sound studio', year: '2024', type: 'Brand & site', bg: 'c-work__thumb-art--3' },
  { span: 7, tag: '04 / Mobile', title: 'Tide. running club', year: '2024', type: 'iOS companion app', bg: 'c-work__thumb-art--4' },
  { span: 12, tag: '05 / Web app', title: 'Halvmaane Editorial CMS', year: '2024', type: 'Editorial tooling', bg: 'c-work__thumb-art--5' },
]
</script>

<template>
  <section id="work" class="c-work">
    <div class="o-wrap">
      <div class="o-section-head">
        <div>
          <div class="o-section-head__num">§ 01 — Selected work</div>
        </div>
        <h2 class="o-section-head__lead">
          <WordReveal text="A handful of recent collaborations." />
          {{ ' ' }}
          <span class="u-italic"><WordReveal text="More on request." :delay="300" /></span>
        </h2>
      </div>

      <div class="c-work__grid">
        <RevealBlock
          v-for="(item, i) in items"
          :key="i"
          as="a"
          :class="`c-work__card c-work__card--span-${item.span}`"
        >
          <div class="c-work__thumb">
            <div :class="`c-work__thumb-art ${item.bg}`">
              <!-- Thumb A: Norrhaus -->
              <svg v-if="i === 0" viewBox="0 0 400 300" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
                <rect width="400" height="300" fill="#E8DECC" />
                <rect x="40" y="60" width="180" height="220" fill="#2B201A" />
                <circle cx="280" cy="150" r="70" fill="#FF5C2A" />
                <rect x="240" y="220" width="120" height="6" fill="#2B201A" />
              </svg>
              <!-- Thumb B: Folio Capital -->
              <svg v-else-if="i === 1" viewBox="0 0 400 300" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
                <rect width="400" height="300" fill="#1F2A20" />
                <g stroke="#7A8A6E" stroke-width="1" fill="none">
                  <line v-for="j in 8" :key="j" x1="40" :y1="50 + (j - 1) * 28" x2="360" :y2="50 + (j - 1) * 28" />
                </g>
                <polyline points="40,200 100,170 160,180 220,120 280,140 360,80" stroke="#FF5C2A" stroke-width="2.5" fill="none" />
                <circle cx="220" cy="120" r="5" fill="#FF5C2A" />
              </svg>
              <!-- Thumb C: Lyse -->
              <svg v-else-if="i === 2" viewBox="0 0 400 300" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
                <rect width="400" height="300" fill="#ECE5D8" />
                <g fill="#3F3128">
                  <rect x="50" y="100" width="60" height="100" />
                  <rect x="120" y="60" width="60" height="180" />
                  <rect x="190" y="130" width="60" height="60" />
                  <rect x="260" y="80" width="60" height="140" />
                </g>
                <line x1="40" y1="240" x2="360" y2="240" stroke="#3F3128" stroke-width="1" />
              </svg>
              <!-- Thumb D: Tide -->
              <svg v-else-if="i === 3" viewBox="0 0 400 300" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
                <rect width="400" height="300" fill="#FF5C2A" />
                <circle cx="200" cy="150" r="100" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="3 6" />
                <circle cx="200" cy="150" r="60" fill="none" stroke="#fff" stroke-width="2" />
                <circle cx="200" cy="150" r="6" fill="#fff" />
                <text x="200" y="280" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" fill="#fff" letter-spacing="2">5.2 KM · 28:14</text>
              </svg>
              <!-- Thumb E: Halvmaane -->
              <svg v-else viewBox="0 0 800 350" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
                <rect width="800" height="350" fill="#2B201A" />
                <g fill="#ECE5D8">
                  <rect x="60" y="60" width="200" height="14" />
                  <rect x="60" y="86" width="160" height="8" opacity="0.6" />
                  <rect x="60" y="120" width="220" height="180" rx="4" opacity="0.08" />
                  <rect x="80" y="140" width="180" height="10" opacity="0.7" />
                  <rect x="80" y="160" width="120" height="6" opacity="0.4" />
                  <rect x="80" y="176" width="160" height="6" opacity="0.4" />
                </g>
                <g fill="#ECE5D8">
                  <rect x="320" y="60" width="420" height="240" rx="4" opacity="0.05" />
                  <rect x="340" y="80" width="280" height="20" opacity="0.9" />
                  <rect x="340" y="110" width="380" height="6" opacity="0.4" />
                  <rect x="340" y="124" width="360" height="6" opacity="0.4" />
                  <rect x="340" y="138" width="320" height="6" opacity="0.4" />
                  <rect x="340" y="170" width="80" height="32" rx="16" fill="#FF5C2A" />
                </g>
              </svg>
            </div>
            <span class="c-work__pill">{{ item.tag }}</span>
            <span class="c-work__year">{{ item.year }}</span>
          </div>
          <div class="c-work__meta">
            <span class="c-work__title">{{ item.title }}</span>
            <span class="c-work__tag">{{ item.type }}</span>
          </div>
        </RevealBlock>
      </div>
    </div>
  </section>
</template>

<style lang="postcss">
:where(.c-work) {
  @apply relative;
  padding: 96px 0;
}

:where(.c-work__grid) {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 32px;
}

:where(.c-work__card) {
  @apply relative cursor-pointer block;
}

:where(.c-work__card--span-7) { grid-column: span 7; }
:where(.c-work__card--span-5) { grid-column: span 5; }
:where(.c-work__card--span-6) { grid-column: span 6; }
:where(.c-work__card--span-12) { grid-column: span 12; }

@media (max-width: 900px) {
  :where(.c-work__card--span-7),
  :where(.c-work__card--span-5),
  :where(.c-work__card--span-6),
  :where(.c-work__card--span-12) { grid-column: span 12; }
}

:where(.c-work__thumb) {
  @apply relative w-full overflow-hidden;
  aspect-ratio: 4 / 3;
  background: var(--bg-deep);
  border-radius: 8px;
  transition: transform 0.7s cubic-bezier(.22,.61,.36,1);
}

:where(.c-work__card--span-12 .c-work__thumb) { aspect-ratio: 16 / 7; }
:where(.c-work__card):hover .c-work__thumb { transform: scale(0.985); }

:where(.c-work__thumb-art) {
  @apply absolute inset-0 flex items-center justify-center;
  transition: transform 1.2s cubic-bezier(.22,.61,.36,1);
}

:where(.c-work__card):hover .c-work__thumb-art { transform: scale(1.06); }

:where(.c-work__pill) {
  @apply absolute font-mono uppercase;
  top: 18px;
  left: 18px;
  padding: 6px 12px;
  font-size: 11px;
  letter-spacing: 0.1em;
  background: rgba(255, 255, 255, 0.85);
  color: #0E0E0E;
  border-radius: 999px;
  backdrop-filter: blur(8px);
}

:where(.c-work__year) {
  @apply absolute font-mono;
  top: 18px;
  right: 18px;
  font-size: 11px;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.7);
}

:where(.c-work__meta) {
  @apply flex justify-between items-baseline gap-4;
  margin-top: 18px;
}

:where(.c-work__title) {
  @apply font-headline font-medium;
  font-size: 22px;
  letter-spacing: -0.02em;
}

:where(.c-work__tag) {
  @apply font-mono uppercase;
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--muted);
}

/* thumb backgrounds */
:where(.c-work__thumb-art--1) { background: linear-gradient(135deg, #E8DECC 0%, #D7C4A4 100%); }
:where(.c-work__thumb-art--2) { background: linear-gradient(135deg, #1F2A20 0%, #2F3B30 100%); }
:where(.c-work__thumb-art--3) { background: linear-gradient(135deg, #ECE5D8 0%, #C8B89A 100%); }
:where(.c-work__thumb-art--4) { background: linear-gradient(135deg, #FF5C2A 0%, #C8553D 100%); }
:where(.c-work__thumb-art--5) { background: linear-gradient(135deg, #2B201A 0%, #3F3128 100%); }
</style>
