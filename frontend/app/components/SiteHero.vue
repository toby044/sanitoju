<template>
  <section class="hero" id="top">
    <div class="wrap">
      <div class="hero-eyebrow reveal in">
        <span class="pulse" />
        <span class="eyebrow">Sanitobi · Independent practice · Est. 2026</span>
      </div>

      <h1 class="h-display">
        <LineReveal
          :lines="['Frontend, brand', 'and the quiet', 'details between.']"
          :italic-indices="[1]"
          :delay-base="120"
        />
      </h1>

      <div class="hero-meta">
        <RevealBlock class="cell" :delay="500">
          <div class="label">Practice</div>
          <div class="val">A solo studio in Denmark, building considered websites and product surfaces for teams that care how things feel.</div>
        </RevealBlock>
        <RevealBlock class="cell" :delay="620">
          <div class="label">Currently</div>
          <div class="val">Booking discovery calls for July — September. Two engagements at a time, never more.</div>
        </RevealBlock>
        <RevealBlock class="cell" :delay="740">
          <div class="label">Local time</div>
          <div class="val">
            <LiveClock /> · 56°N, 10°E
          </div>
        </RevealBlock>
      </div>
    </div>

    <div class="hero-status">
      <span class="dot" />
      Accepting new work — replies within 48 hours
    </div>
  </section>
</template>
