<template>
  <section id="about" class="tight">
    <div class="wrap">
      <div class="section-head">
        <div>
          <div class="num">§ 03 — About</div>
        </div>
        <h2 class="lead">
          <WordReveal text="A practice of one." />
        </h2>
      </div>

      <div class="about-grid">
        <div>
          <p class="about-lead">
            <WordReveal text="Four years building websites for clients who want a" />
            {{ ' ' }}
            <span class="italic accent"><WordReveal text="distinct expression" :delay="200" /></span>
            {{ ' ' }}
            <WordReveal text="— small teams, careful taste, and the patience to get things right." :delay="400" />
          </p>

          <RevealBlock class="about-stats" :stagger="true">
            <div class="stat">
              <div class="num">04</div>
              <div class="label">Years freelancing</div>
            </div>
            <div class="stat">
              <div class="num">27</div>
              <div class="label">Sites shipped</div>
            </div>
            <div class="stat">
              <div class="num">02</div>
              <div class="label">Concurrent clients, max</div>
            </div>
            <div class="stat">
              <div class="num">∞</div>
              <div class="label">Late-night refactors</div>
            </div>
          </RevealBlock>
        </div>

        <RevealBlock>
          <div class="about-portrait">
            <div class="placeholder">[ Portrait — drop in later ]</div>
            <div class="name-tag">Founder · Sanitobi</div>
          </div>
        </RevealBlock>
      </div>
    </div>
  </section>
</template>
