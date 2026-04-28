<template>
  <section id="contact" class="contact">
    <div class="wrap">
      <div class="eyebrow">§ 07 — Get in touch</div>

      <h2 class="contact-headline">
        <LineReveal :lines="['Have a project', 'in mind?']" :italic-indices="[1]" />
      </h2>

      <a href="mailto:hello@sanitobi.studio" class="contact-cta">
        <span class="dot" />
        hello@sanitobi.studio
        <ArrowIcon :size="18" />
      </a>

      <div class="contact-grid" style="margin-top: 96px;">
        <div>
          <div class="label">Studio</div>
          <div class="value">Sanitobi</div>
          <div class="sub">Independent practice, Denmark</div>
        </div>
        <div>
          <div class="label">Booking</div>
          <div class="value">cal.com / sanitobi</div>
          <div class="sub">30-minute introduction calls</div>
        </div>
        <div>
          <div class="label">Elsewhere</div>
          <div class="value">are.na · read.cv · github</div>
          <div class="sub">Quietly, occasionally</div>
        </div>
      </div>
    </div>
  </section>
</template>
