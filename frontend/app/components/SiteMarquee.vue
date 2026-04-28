<script setup lang="ts">
const items = [
  'Frontend engineering',
  'Brand systems',
  'Web apps',
  'Mobile apps',
  'Design + build',
  'Architecture',
  'Animation',
  'Prototyping',
]
</script>

<template>
  <div class="marquee" aria-hidden="true">
    <div class="marquee-track">
      <span v-for="n in 3" :key="n">
        <template v-for="(item, i) in items" :key="i">
          <span>{{ item }}</span>
          <span class="dot" />
        </template>
      </span>
    </div>
  </div>
</template>
