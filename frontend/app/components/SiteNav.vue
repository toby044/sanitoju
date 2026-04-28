<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()
const scrolled = computed(() => y.value > 40)
</script>

<template>
  <nav :class="['nav', scrolled ? 'scrolled' : '']">
    <a href="#top" class="nav-logo">
      <LogoMark :size="22" />
      <span>Sanitobi</span>
    </a>
    <div class="nav-links">
      <a href="#work">Work</a>
      <a href="#services">Services</a>
      <a href="#about">About</a>
      <a href="#process">Process</a>
      <a href="#writing">Writing</a>
      <a href="#contact">Contact</a>
    </div>
    <a href="#contact" class="btn">
      <span class="dot" />
      Available for Q3
    </a>
  </nav>
</template>
