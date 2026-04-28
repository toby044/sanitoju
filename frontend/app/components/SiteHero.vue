<template>
  <section class="c-hero" id="top">
    <div class="o-wrap">
      <div class="c-hero__eyebrow c-reveal is-in">
        <span class="c-hero__pulse" aria-hidden="true" />
        <span class="u-eyebrow">Sanitobi · Independent practice · Est. 2026</span>
      </div>

      <h1 class="c-hero__headline u-h-display">
        <LineReveal
          :lines="['Frontend, brand', 'and the quiet', 'details between.']"
          :italic-indices="[1]"
          :delay-base="120"
        />
      </h1>

      <div class="c-hero__meta">
        <RevealBlock class="c-hero__cell" :delay="500">
          <div class="c-hero__cell-label">Practice</div>
          <div class="c-hero__cell-val">A solo studio in Denmark, building considered websites and product surfaces for teams that care how things feel.</div>
        </RevealBlock>
        <RevealBlock class="c-hero__cell" :delay="620">
          <div class="c-hero__cell-label">Currently</div>
          <div class="c-hero__cell-val">Booking discovery calls for July — September. Two engagements at a time, never more.</div>
        </RevealBlock>
        <RevealBlock class="c-hero__cell" :delay="740">
          <div class="c-hero__cell-label">Local time</div>
          <div class="c-hero__cell-val">
            <LiveClock /> · 56°N, 10°E
          </div>
        </RevealBlock>
      </div>
    </div>

    <div class="c-hero__status">
      <span class="c-hero__status-dot" aria-hidden="true" />
      Accepting new work — replies within 48 hours
    </div>
  </section>
</template>

<style lang="postcss">
:where(.c-hero) {
  @apply relative overflow-hidden;
  padding: 180px 0 120px;
}

:where(.c-hero__eyebrow) {
  @apply flex items-center gap-[14px];
  margin-bottom: 56px;
}

:where(.c-hero__pulse) {
  @apply relative shrink-0 rounded-full bg-accent;
  width: 8px;
  height: 8px;
}

:where(.c-hero__pulse)::after {
  content: "";
  @apply absolute rounded-full border border-accent;
  inset: -4px;
  animation: c-hero-pulse 2s ease-out infinite;
}

@keyframes c-hero-pulse {
  0% { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(2.5); opacity: 0; }
}

:where(.c-hero__headline) {
  font-size: clamp(56px, 11vw, 184px);
}

:where(.c-hero__meta) {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 48px;
  margin-top: 80px;
  padding-top: 28px;
  border-top: 1px solid var(--line);
}

@media (max-width: 720px) {
  :where(.c-hero__meta) { grid-template-columns: 1fr; gap: 24px; }
}

:where(.c-hero__cell-label) {
  @apply font-mono uppercase;
  font-size: 11px;
  letter-spacing: 0.14em;
  color: var(--muted);
  margin-bottom: 12px;
}

:where(.c-hero__cell-val) {
  font-size: 16px;
  letter-spacing: -0.01em;
  line-height: 1.4;
}

:where(.c-hero__status) {
  @apply absolute flex items-center gap-3 z-[5];
  right: 48px;
  top: 130px;
  border: 1px solid var(--line);
  background: color-mix(in oklab, var(--bg) 92%, var(--ink));
  border-radius: 14px;
  padding: 14px 18px;
  font-size: 13px;
  animation: c-hero-floaty 6s ease-in-out infinite;
}

@keyframes c-hero-floaty {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

:where(.c-hero__status-dot) {
  @apply rounded-full shrink-0;
  width: 8px;
  height: 8px;
  background: #36C46B;
  box-shadow: 0 0 12px #36C46B;
}

@media (max-width: 1100px) {
  :where(.c-hero__status) { @apply hidden; }
}
</style>
