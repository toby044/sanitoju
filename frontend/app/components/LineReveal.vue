<script setup lang="ts">
const props = withDefaults(defineProps<{
  lines: string[]
  delayBase?: number
  italicIndices?: number[]
}>(), { delayBase: 0, italicIndices: () => [] })

const { el, inView } = useInView(0.25)
</script>

<template>
  <span ref="el">
    <span v-for="(line, i) in props.lines" :key="i" class="c-line-reveal__line">
      <span
        :class="props.italicIndices.includes(i) ? 'u-italic' : ''"
        :style="{
          transform: inView ? 'none' : 'translateY(110%)',
          display: 'block',
          transition: `transform 1.05s cubic-bezier(.22,.61,.36,1) ${props.delayBase + i * 80}ms`,
        }"
      >{{ line }}</span>
    </span>
  </span>
</template>

<style lang="postcss">
:where(.c-line-reveal__line) {
  @apply block overflow-hidden;
  padding-bottom: 0.14em;
  margin-bottom: -0.14em;
}

:where(.c-line-reveal__line > span) {
  @apply block;
}
</style>
