<script setup lang="ts">
const posts = [
  { date: '2026 · 03', title: 'Designing in the browser, eight years on', topic: 'Practice' },
  { date: '2026 · 02', title: 'A small case for fewer pages', topic: 'Web' },
  { date: '2025 · 11', title: 'Type systems for two-person companies', topic: 'Brand' },
  { date: '2025 · 09', title: 'What I look for in a frontend repo', topic: 'Engineering' },
]
</script>

<template>
  <section id="writing" class="tight">
    <div class="wrap">
      <div class="section-head">
        <div>
          <div class="num">§ 06 — Writing</div>
        </div>
        <h2 class="lead">
          <WordReveal text="Notes, occasionally," />
          {{ ' ' }}
          <span class="italic"><WordReveal text="when something is worth saying." :delay="260" /></span>
        </h2>
      </div>

      <div class="writing-list">
        <a v-for="(post, i) in posts" :key="i" class="writing-row">
          <span class="date">{{ post.date }}</span>
          <span class="title">{{ post.title }}</span>
          <span class="topic">{{ post.topic }}</span>
          <span class="arr"><ArrowIcon :size="16" /></span>
        </a>
      </div>
    </div>
  </section>
</template>
