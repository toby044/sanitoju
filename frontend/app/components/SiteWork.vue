<script setup lang="ts">
const items = [
  { span: 7, tag: '01 / Brand & web', title: 'Norrhaus Atelier', year: '2025', type: 'Furniture studio', bg: 'thumb-bg-1' },
  { span: 5, tag: '02 / Product', title: 'Folio Capital', year: '2025', type: 'Fintech dashboard', bg: 'thumb-bg-2' },
  { span: 5, tag: '03 / Identity', title: 'Lyse — sound studio', year: '2024', type: 'Brand & site', bg: 'thumb-bg-3' },
  { span: 7, tag: '04 / Mobile', title: 'Tide. running club', year: '2024', type: 'iOS companion app', bg: 'thumb-bg-4' },
  { span: 12, tag: '05 / Web app', title: 'Halvmaane Editorial CMS', year: '2024', type: 'Editorial tooling', bg: 'thumb-bg-5' },
]
</script>

<template>
  <section id="work" class="tight">
    <div class="wrap">
      <div class="section-head">
        <div>
          <div class="num">§ 01 — Selected work</div>
        </div>
        <h2 class="lead">
          <WordReveal text="A handful of recent collaborations." />
          {{ ' ' }}
          <span class="italic"><WordReveal text="More on request." :delay="300" /></span>
        </h2>
      </div>

      <div class="work-grid">
        <RevealBlock
          v-for="(item, i) in items"
          :key="i"
          as="a"
          :class="`work-card span-${item.span}`"
        >
          <div class="work-thumb">
            <div :class="`thumb-art ${item.bg}`">
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
            <span class="pill">{{ item.tag }}</span>
            <span class="year">{{ item.year }}</span>
          </div>
          <div class="work-meta">
            <span class="title">{{ item.title }}</span>
            <span class="tag">{{ item.type }}</span>
          </div>
        </RevealBlock>
      </div>
    </div>
  </section>
</template>
