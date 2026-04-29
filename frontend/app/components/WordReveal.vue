<script setup lang="ts">
const props = defineProps<{
  text: string
  delay?: number
}>()

const { el, inView } = useInView(0.4)
const words = computed(() => props.text.split(' '))
</script>

<template>
  <span ref="el">
    <template v-for="(word, i) in words" :key="i">
      <span :class="['c-word-reveal', inView ? 'is-in' : '']">
        <span :style="{ transitionDelay: `${(props.delay ?? 0) + i * 60}ms` }">{{ word }}</span>
      </span>
      <template v-if="i < words.length - 1">&nbsp;</template>
    </template>
  </span>
</template>

<style lang="postcss">
:where(.c-word-reveal) {
  @apply inline-block overflow-hidden;
  vertical-align: bottom;
  padding-bottom: 0.14em;
  margin-bottom: -0.14em;
}

:where(.u-italic .c-word-reveal) {
  padding-inline-end: 0.14em;
}

:where(.c-word-reveal > span) {
  @apply inline-block;
  transform: translateY(110%);
  transition: transform 0.95s cubic-bezier(.22,.61,.36,1);
}

:where(.c-word-reveal.is-in > span) {
  transform: none;
}
</style>
