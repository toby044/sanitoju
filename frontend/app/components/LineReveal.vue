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
    <span v-for="(line, i) in props.lines" :key="i" class="line">
      <span
        :class="props.italicIndices.includes(i) ? 'italic' : ''"
        :style="{
          transform: inView ? 'none' : 'translateY(110%)',
          display: 'block',
          transition: `transform 1.05s cubic-bezier(.22,.61,.36,1) ${props.delayBase + i * 80}ms`,
        }"
      >{{ line }}</span>
    </span>
  </span>
</template>
