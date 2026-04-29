<script setup lang="ts">
defineProps<{
  block: {
    content: unknown[];
  };
}>();
</script>

<template>
  <section class="container mx-auto max-w-3xl px-8 py-12">
    <div class="prose">
      <SanityContent :blocks="block.content" />
    </div>
  </section>
</template>
