<template>
  <footer class="c-footer">
    <div class="o-wrap">
      <div class="c-footer__mark">
        <span>Sanitobi</span>
        <span class="c-footer__mark-dot" aria-hidden="true" />
      </div>

      <div class="c-footer__bottom">
        <span>© 2026 Sanitobi · Independent practice</span>
        <span><LiveClock /></span>
        <span>Built by hand · Aarhus, DK</span>
      </div>
    </div>
  </footer>
</template>

<style lang="postcss">
:where(.c-footer) {
  background: var(--ink);
  color: var(--bg);
  padding: 80px 0 40px;
  border-top: 1px solid color-mix(in oklab, var(--bg) 14%, transparent);
}

:where(.c-footer__mark) {
  @apply flex items-baseline justify-between flex-wrap gap-6 font-headline;
  font-weight: 600;
  font-size: clamp(80px, 18vw, 280px);
  letter-spacing: -0.05em;
  line-height: 0.85;
  margin: 32px 0;
}

:where(.c-footer__mark-dot) {
  @apply inline-block rounded-full shrink-0 bg-accent;
  width: 24px;
  height: 24px;
}

:where(.c-footer__bottom) {
  @apply flex justify-between items-center flex-wrap font-mono uppercase;
  font-size: 11px;
  letter-spacing: 0.12em;
  color: color-mix(in oklab, var(--bg) 60%, transparent);
  border-top: 1px solid color-mix(in oklab, var(--bg) 18%, transparent);
  padding-top: 32px;
  gap: 16px;
}
</style>
