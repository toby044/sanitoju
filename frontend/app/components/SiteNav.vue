<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()
const scrolled = computed(() => y.value > 40)
</script>

<template>
  <nav :class="['c-nav', scrolled ? 'c-nav--scrolled' : '']">
    <a href="#top" class="c-nav__logo">
      <LogoMark :size="22" />
      <span>Sanitobi</span>
    </a>
    <div class="c-nav__links">
      <a href="#work">Work</a>
      <a href="#services">Services</a>
      <a href="#about">About</a>
      <a href="#process">Process</a>
      <a href="#writing">Writing</a>
      <a href="#contact">Contact</a>
    </div>
    <Button as="a" href="#contact">Available for Q3</Button>
  </nav>
</template>

<style lang="postcss">
:where(.c-nav) {
  @apply fixed inset-x-0 top-0 z-[100] flex items-center justify-between;
  padding: 22px 48px;
  transition: backdrop-filter 0.3s, background 0.3s, padding 0.4s;
}

:where(.c-nav--scrolled) {
  background: color-mix(in oklab, var(--bg) 78%, transparent);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  padding: 14px 48px;
  border-bottom: 1px solid var(--line);
}

@media (max-width: 720px) {
  :where(.c-nav),
  :where(.c-nav--scrolled) {
    padding-left: 24px;
    padding-right: 24px;
  }
}

:where(.c-nav__logo) {
  @apply flex items-center gap-[10px] font-headline font-semibold;
  font-size: 18px;
  letter-spacing: -0.02em;
}

:where(.c-nav__links) {
  @apply flex gap-8;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.005em;
}

:where(.c-nav__links a) {
  @apply relative;
  padding: 6px 0;
  opacity: 0.7;
  transition: opacity 0.3s;
}

:where(.c-nav__links a):hover { opacity: 1; }

:where(.c-nav__links a)::after {
  content: "";
  @apply absolute left-0 right-0 bottom-0;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(.22,.61,.36,1);
}

:where(.c-nav__links a):hover::after { transform: scaleX(1); }

@media (max-width: 720px) {
  :where(.c-nav__links) { @apply hidden; }
}
</style>
