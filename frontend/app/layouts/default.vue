<script setup></script>
<template>
  <NuxtRouteAnnouncer />
  <div class="c-noise" aria-hidden="true" />
  <ClientOnly>
    <SiteCursor />
  </ClientOnly>
  <NuxtPage />
</template>

<style lang="postcss">
#app {
  @apply min-h-screen flex flex-col;
}
</style>
