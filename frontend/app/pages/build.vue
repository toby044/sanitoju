<script setup lang="ts">
useHead({
  title: "Build — Sanitobi",
  meta: [
    {
      name: "description",
      content:
        "Drag the blocks you want into the bar. The price assembles itself.",
    },
  ],
});
</script>

<template>
  <nav class="c-build-nav">
    <NuxtLink to="/" class="c-build-nav__logo">
      <span>Sanitobi</span>
      <span class="c-build-nav__sep">/</span>
      <span class="c-build-nav__here">build</span>
    </NuxtLink>
    <div class="c-build-nav__meta">
      <NuxtLink to="/#work">Work</NuxtLink>
      <NuxtLink to="/#process">Process</NuxtLink>
      <NuxtLink to="/#contact">Contact</NuxtLink>
    </div>
  </nav>

  <header class="c-build-head">
    <div>
      <h1 class="c-build-head__title u-h-display">
        Build your site,
        <span class="u-italic">block by block.</span>
      </h1>
    </div>
    <p class="c-build-head__sub">
      Drag the blocks you want into the bar at the bottom. The price assembles
      itself. When it feels right, send it across as a brief — or save the link
      for later.
    </p>
  </header>

  <ClientOnly>
    <BuildComposer />
  </ClientOnly>
</template>

<style lang="postcss">
:root {
  --bg-card: #faf7f0;
  --dock-h: 196px;
}

:where(.c-build-nav) {
  position: sticky;
  top: 0;
  z-index: 80;
  background: color-mix(in oklab, var(--bg) 84%, transparent);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
}
:where(.c-build-nav__logo) {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--headline-font);
  font-weight: 600;
  font-size: 16px;
  letter-spacing: -0.02em;
}
:where(.c-build-nav__sep) {
  color: var(--muted);
  font-weight: 400;
  margin: 0 2px 0 6px;
}
:where(.c-build-nav__here) {
  font-family: var(--mono-font);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.05em;
  color: var(--muted);
}
:where(.c-build-nav__meta) {
  display: flex;
  align-items: center;
  gap: 24px;
  font-family: var(--mono-font);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}
:where(.c-build-nav__meta a) {
  color: var(--ink);
  opacity: 0.7;
  transition: opacity 0.25s;
}
:where(.c-build-nav__meta a:hover) {
  opacity: 1;
}

:where(.c-build-head) {
  padding: 56px 48px 32px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 48px;
  align-items: end;
}
:where(.c-build-head__title) {
  font-size: clamp(40px, 6vw, 88px);
  margin: 16px 0 0;
  max-width: 14ch;
}
:where(.c-build-head__sub) {
  max-width: 36ch;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.55;
  letter-spacing: -0.005em;
}
:where(.c-build-head__crumb) {
  font-family: var(--mono-font);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  display: flex;
  align-items: center;
  gap: 10px;
}
:where(.c-build-head__pulse) {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  position: relative;
}
:where(.c-build-head__pulse)::after {
  content: "";
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  border: 1px solid var(--accent);
  animation: c-build-pulse 2s ease-out infinite;
}
@keyframes c-build-pulse {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}

@media (max-width: 800px) {
  :where(.c-build-head) {
    grid-template-columns: 1fr;
    padding: 32px 24px 24px;
  }
}
</style>
