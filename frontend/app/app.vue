<script setup>
useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: { lang: 'en' },
})
</script>

<template>
  <div>
    <div class="c-noise" aria-hidden="true" />
    <ClientOnly>
      <SiteCursor />
    </ClientOnly>
    <NuxtPage />
  </div>
</template>

<style lang="postcss">
:where(.c-noise) {
  @apply fixed inset-0 pointer-events-none z-[9998];
  opacity: 0.035;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
}
</style>
