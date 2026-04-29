<script setup lang="ts">
const props = defineProps<{
  title?: string;
  description?: string;
}>();

const titleLines = computed(() => (props.title ? [props.title] : []));
</script>

<template>
  <header class="c-page-header">
    <div class="o-wrap">
      <h1 v-if="titleLines.length" class="c-page-header__title u-h-display">
        <LineReveal :lines="titleLines" :delay-base="80" />
      </h1>
      <RevealBlock v-if="description" class="c-page-header__desc" :delay="240">
        {{ description }}
      </RevealBlock>
    </div>
  </header>
</template>

<style lang="postcss">
:where(.c-page-header) {
  @apply pt-140px pb-80px;
}

:where(.c-page-header__title) {
  @apply text-[clamp(36px,6vw,96px)];
}

:where(.c-page-header__desc) {
  @apply mt-32px text-16px tracking-[-0.01em] leading-[1.5] text-[--muted] max-w-[56ch];
}
</style>
