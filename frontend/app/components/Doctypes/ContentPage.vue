<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

const props = defineProps<{ document: SanityDocument }>();
useDocumentSeo(props.document);

const { blocks, title, showHeader, description } = props?.document;
</script>

<template>
  <NuxtLayout name="site">
    <template #header>
      <PageHeader v-if="showHeader" :title="title" :description="description" />
    </template>
    <BlockList v-if="blocks?.length" :blocks="document.blocks" />
  </NuxtLayout>
</template>
