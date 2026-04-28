<template>
  <section id="about" class="c-about">
    <div class="o-wrap">
      <div class="o-section-head">
        <div>
          <div class="o-section-head__num">§ 03 — About</div>
        </div>
        <h2 class="o-section-head__lead">
          <WordReveal text="A practice of one." />
        </h2>
      </div>

      <div class="c-about__grid">
        <div>
          <p class="c-about__lead">
            <WordReveal text="Four years building websites for clients who want a" />
            {{ ' ' }}
            <span class="u-italic text-accent"><WordReveal text="distinct expression" :delay="200" /></span>
            {{ ' ' }}
            <WordReveal text="— small teams, careful taste, and the patience to get things right." :delay="400" />
          </p>

          <RevealBlock class="c-about__stats" :stagger="true">
            <div class="c-about__stat">
              <div class="c-about__stat-num">04</div>
              <div class="c-about__stat-label">Years freelancing</div>
            </div>
            <div class="c-about__stat">
              <div class="c-about__stat-num">27</div>
              <div class="c-about__stat-label">Sites shipped</div>
            </div>
            <div class="c-about__stat">
              <div class="c-about__stat-num">02</div>
              <div class="c-about__stat-label">Concurrent clients, max</div>
            </div>
            <div class="c-about__stat">
              <div class="c-about__stat-num">∞</div>
              <div class="c-about__stat-label">Late-night refactors</div>
            </div>
          </RevealBlock>
        </div>

        <RevealBlock>
          <div class="c-about__portrait">
            <div class="c-about__portrait-placeholder">[ Portrait — drop in later ]</div>
            <div class="c-about__name-tag">Founder · Sanitobi</div>
          </div>
        </RevealBlock>
      </div>
    </div>
  </section>
</template>

<style lang="postcss">
:where(.c-about) {
  @apply relative;
  padding: 96px 0;
}

:where(.c-about__grid) {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 96px;
  align-items: start;
}

@media (max-width: 900px) {
  :where(.c-about__grid) { grid-template-columns: 1fr; gap: 48px; }
}

:where(.c-about__lead) {
  font-size: clamp(28px, 3.4vw, 48px);
  @apply font-headline;
  font-weight: 400;
  letter-spacing: -0.025em;
  line-height: 1.1;
}

:where(.c-about__stats) {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  margin-top: 48px;
}

:where(.c-about__stat) {
  border-top: 1px solid var(--line);
  padding: 24px 0;
}

:where(.c-about__stat-num) {
  @apply font-headline font-medium;
  font-size: 56px;
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: 12px;
}

:where(.c-about__stat-label) {
  @apply font-mono uppercase;
  font-size: 11px;
  letter-spacing: 0.14em;
  color: var(--muted);
}

:where(.c-about__portrait) {
  @apply relative flex items-end justify-start overflow-hidden;
  aspect-ratio: 4 / 5;
  background: var(--bg-deep);
  border-radius: 8px;
  padding: 24px;
}

:where(.c-about__portrait)::before {
  content: "";
  @apply absolute inset-0;
  background-image: repeating-linear-gradient(135deg, transparent 0 14px, color-mix(in oklab, var(--ink) 5%, transparent) 14px 15px);
}

:where(.c-about__portrait-placeholder) {
  @apply absolute inset-0 flex items-center justify-center font-mono uppercase;
  font-size: 12px;
  color: var(--muted);
  letter-spacing: 0.12em;
}

:where(.c-about__name-tag) {
  @apply relative z-[1] font-mono;
  background: var(--bg);
  padding: 10px 14px;
  border-radius: 6px;
  font-size: 12px;
  letter-spacing: 0.08em;
}
</style>
