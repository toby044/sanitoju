<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

const props = defineProps<{ document: SanityDocument }>();
useDocumentSeo(props.document);
</script>

<template>
  <main>
    <BlockList v-if="document.pageBuilder?.length" :blocks="document.pageBuilder" />
  </main>
</template>
