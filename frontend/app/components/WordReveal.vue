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
      <span :class="['word-reveal', inView ? 'in' : '']">
        <span :style="{ transitionDelay: `${(props.delay ?? 0) + i * 60}ms` }">{{ word }}</span>
      </span>
      <template v-if="i < words.length - 1">&nbsp;</template>
    </template>
  </span>
</template>
