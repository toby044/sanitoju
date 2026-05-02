<script setup></script>
<template>
  <SiteHeader />
  <slot name="header" />
  <main id="main">
    <slot />
  </main>
  <slot name="beforeFooter" />
  <SiteFooter />
  <slot name="afterFooter" />
</template>

<style lang="postcss">
#main {
  @apply grow;
}
</style>
