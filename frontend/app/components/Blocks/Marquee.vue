<script setup lang="ts">
defineProps<{
  block: { items?: string[] }
}>()
</script>

<template>
  <div v-if="block.items?.length" class="c-marquee" aria-hidden="true">
    <div class="c-marquee__track">
      <span v-for="n in 3" :key="n">
        <template v-for="(item, i) in block.items" :key="i">
          <span>{{ item }}</span>
          <span class="c-marquee__dot" aria-hidden="true" />
        </template>
      </span>
    </div>
  </div>
</template>

<style lang="postcss">
:where(.c-marquee) {
  @apply overflow-hidden whitespace-nowrap relative;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding: 24px 0;
}

:where(.c-marquee__track) {
  @apply inline-flex gap-[56px];
  font-size: 28px;
  font-weight: 500;
  letter-spacing: -0.025em;
  animation: c-marquee-scroll 38s linear infinite;
}

:where(.c-marquee__track span) {
  @apply inline-flex items-center gap-[56px];
}

:where(.c-marquee__dot) {
  @apply inline-block rounded-full shrink-0 bg-accent;
  width: 10px;
  height: 10px;
}

@keyframes c-marquee-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
</style>
