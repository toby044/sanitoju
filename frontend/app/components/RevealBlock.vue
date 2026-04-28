<script setup lang="ts">
const props = withDefaults(defineProps<{
  stagger?: boolean
  delay?: number
  as?: string
}>(), { as: 'div' })

const { el, inView } = useInView()
</script>

<template>
  <component
    :is="props.as"
    ref="el"
    :class="[props.stagger ? 'reveal-stagger' : 'reveal', inView ? 'in' : '']"
    :style="props.delay ? { transitionDelay: `${props.delay}ms` } : undefined"
  >
    <slot />
  </component>
</template>
