<script setup lang="ts">
withDefaults(defineProps<{
  as?: string
  variant?: 'default' | 'ghost'
}>(), { as: 'button', variant: 'default' })
</script>

<template>
  <component
    :is="as"
    :class="['c-button', variant === 'ghost' && 'c-button--ghost']"
    v-bind="$attrs"
  >
    <span class="c-button__dot" aria-hidden="true" />
    <slot />
  </component>
</template>

<style lang="postcss">
:where(.c-button) {
  @apply inline-flex items-center gap-3 rounded-full border-none cursor-pointer font-medium;
  padding: 14px 22px 14px 26px;
  background: var(--ink);
  color: var(--bg);
  font-size: 15px;
  letter-spacing: -0.01em;
  font-family: inherit;
  transition: background 0.3s, color 0.3s, transform 0.3s;
}

:where(.c-button):hover {
  background: var(--accent);
  color: #fff;
}

:where(.c-button__dot) {
  @apply rounded-full shrink-0;
  width: 8px;
  height: 8px;
  background: var(--accent);
  transition: background 0.3s, transform 0.3s;
}

:where(.c-button):hover .c-button__dot {
  background: var(--bg);
  transform: scale(1.5);
}

:where(.c-button--ghost) {
  background: transparent;
  color: var(--ink);
  border: 1px solid var(--line-strong);
}

:where(.c-button--ghost):hover {
  background: var(--ink);
  color: var(--bg);
  border-color: var(--ink);
}

:where(.c-button--ghost):hover .c-button__dot {
  background: var(--accent);
}
</style>
