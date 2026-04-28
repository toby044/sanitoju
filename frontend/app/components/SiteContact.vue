<template>
  <section id="contact" class="c-contact">
    <div class="o-wrap">
      <div class="u-eyebrow c-contact__eyebrow">§ 07 — Get in touch</div>

      <h2 class="c-contact__headline">
        <LineReveal :lines="['Have a project', 'in mind?']" :italic-indices="[1]" />
      </h2>

      <a href="mailto:hello@sanitobi.studio" class="c-contact__cta">
        <span class="c-contact__cta-dot" aria-hidden="true" />
        hello@sanitobi.studio
        <ArrowIcon :size="18" />
      </a>

      <div class="c-contact__grid" style="margin-top: 96px;">
        <div>
          <div class="c-contact__grid-label">Studio</div>
          <div class="c-contact__grid-value">Sanitobi</div>
          <div class="c-contact__grid-sub">Independent practice, Denmark</div>
        </div>
        <div>
          <div class="c-contact__grid-label">Booking</div>
          <div class="c-contact__grid-value">cal.com / sanitobi</div>
          <div class="c-contact__grid-sub">30-minute introduction calls</div>
        </div>
        <div>
          <div class="c-contact__grid-label">Elsewhere</div>
          <div class="c-contact__grid-value">are.na · read.cv · github</div>
          <div class="c-contact__grid-sub">Quietly, occasionally</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="postcss">
:where(.c-contact) {
  @apply relative;
  background: var(--ink);
  color: var(--bg);
  padding: 160px 0 0;
}

:where(.c-contact__eyebrow) {
  color: color-mix(in oklab, var(--bg) 60%, transparent);
}

:where(.c-contact__headline) {
  @apply font-headline font-medium;
  font-size: clamp(64px, 11vw, 200px);
  letter-spacing: -0.045em;
  line-height: 0.88;
  margin: 32px 0 64px;
}

:where(.c-contact__cta) {
  @apply inline-flex items-center gap-[18px] font-headline font-medium cursor-pointer;
  font-size: 22px;
  letter-spacing: -0.015em;
  padding: 24px 36px;
  border: 1px solid color-mix(in oklab, var(--bg) 22%, transparent);
  border-radius: 999px;
  background: transparent;
  color: var(--bg);
  transition: background 0.4s, color 0.4s, border-color 0.4s;
}

:where(.c-contact__cta):hover {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

:where(.c-contact__cta-dot) {
  @apply rounded-full shrink-0;
  width: 10px;
  height: 10px;
  background: var(--accent);
  transition: background 0.3s, transform 0.3s;
}

:where(.c-contact__cta):hover .c-contact__cta-dot {
  background: #fff;
  transform: scale(1.4);
}

:where(.c-contact__grid) {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 32px;
  border-top: 1px solid color-mix(in oklab, var(--bg) 18%, transparent);
  padding-top: 40px;
  margin-bottom: 96px;
}

@media (max-width: 900px) {
  :where(.c-contact__grid) { grid-template-columns: 1fr; gap: 24px; }
}

:where(.c-contact__grid-label) {
  @apply font-mono uppercase;
  font-size: 11px;
  letter-spacing: 0.14em;
  color: color-mix(in oklab, var(--bg) 60%, transparent);
  margin-bottom: 16px;
}

:where(.c-contact__grid-value) {
  @apply font-headline font-medium;
  font-size: 24px;
  letter-spacing: -0.02em;
}

:where(.c-contact__grid-sub) {
  font-size: 14px;
  color: color-mix(in oklab, var(--bg) 70%, transparent);
  margin-top: 6px;
}
</style>
