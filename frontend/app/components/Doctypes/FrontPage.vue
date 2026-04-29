<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

const props = defineProps<{ document: SanityDocument }>();
useDocumentSeo(props.document);
</script>

<template>
  <NuxtLayout name="site">
    <BlockList v-if="document.blocks?.length" :blocks="document.blocks" />
  </NuxtLayout>
</template>
