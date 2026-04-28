<script setup lang="ts">
const steps = [
  { n: '01', name: 'Conversation', desc: 'A 30-minute call to understand the work, the team and the timeline. No deck, no pitch. Honest about whether I\'m the right fit.', tag: 'Week 0' },
  { n: '02', name: 'Shape', desc: 'A short written proposal — scope, milestones, fixed price or weekly rate. We agree on what \'done\' means before anything starts.', tag: 'Week 0–1' },
  { n: '03', name: 'Build', desc: 'Designing in code from day one. Weekly demos in a real environment. You see progress where it counts — on the screen.', tag: 'Weeks 1–N' },
  { n: '04', name: 'Hand off', desc: 'A clean repository, a written runbook, and a quiet first week of post-launch fixes. I stay available; I don\'t disappear.', tag: 'Wrap' },
]
</script>

<template>
  <section id="process" class="process">
    <div class="wrap">
      <div class="section-head">
        <div>
          <div class="num">§ 04 — How I work</div>
        </div>
        <h2 class="lead">
          <WordReveal text="A small, predictable process." />
        </h2>
      </div>

      <RevealBlock class="process-steps" :stagger="true">
        <div v-for="step in steps" :key="step.n" class="process-step">
          <div class="step-num">{{ step.n }}</div>
          <div class="step-name">{{ step.name }}</div>
          <div class="step-desc">{{ step.desc }}</div>
          <div class="step-tag">{{ step.tag }}</div>
        </div>
      </RevealBlock>
    </div>
  </section>
</template>
