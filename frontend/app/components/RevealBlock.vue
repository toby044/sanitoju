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
    :class="[props.stagger ? 'c-reveal--stagger' : 'c-reveal', inView ? 'is-in' : '']"
    :style="props.delay ? { transitionDelay: `${props.delay}ms` } : undefined"
  >
    <slot />
  </component>
</template>

<style lang="postcss">
:where(.c-reveal) {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 1.1s cubic-bezier(.22,.61,.36,1), transform 1.1s cubic-bezier(.22,.61,.36,1);
}

:where(.c-reveal.is-in) {
  opacity: 1;
  transform: none;
}

:where(.c-reveal--stagger > *) {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.9s cubic-bezier(.22,.61,.36,1), transform 0.9s cubic-bezier(.22,.61,.36,1);
}

:where(.c-reveal--stagger.is-in > *) {
  opacity: 1;
  transform: none;
}

:where(.c-reveal--stagger.is-in > *:nth-child(1)) { transition-delay: 0.05s; }
:where(.c-reveal--stagger.is-in > *:nth-child(2)) { transition-delay: 0.12s; }
:where(.c-reveal--stagger.is-in > *:nth-child(3)) { transition-delay: 0.19s; }
:where(.c-reveal--stagger.is-in > *:nth-child(4)) { transition-delay: 0.26s; }
:where(.c-reveal--stagger.is-in > *:nth-child(5)) { transition-delay: 0.33s; }
:where(.c-reveal--stagger.is-in > *:nth-child(6)) { transition-delay: 0.40s; }
</style>
