<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import type { PageMetadata } from "@q42/sanity-plugin-page-tree/client";
import { usePageTree } from "~/composables/usePageTree";
import ContentPage from "~/components/Doctypes/ContentPage.vue";
import EventsList from "~/components/Doctypes/EventsList.vue";

const route = useRoute();
const segments = route.params.slug as string[];
const path = "/" + segments.join("/");

const pageTree = usePageTree();
const allPages = await pageTree.getAllPageMetadata();
const pageMeta = allPages.find((p: PageMetadata) => p.path === path);

const { data: document } = await useSanityQuery<SanityDocument>(
  groq`*[_id == $id][0]`,
  { id: pageMeta?._id ?? "" }
);

const componentMap: Record<string, Component> = {
  contentPage: ContentPage,
  eventList: EventsList,
};

const resolvedComponent = computed(() =>
  document.value?._type ? (componentMap[document.value._type] ?? null) : null
);
</script>

<template>
  <component :is="resolvedComponent" v-if="resolvedComponent" :document="document" />
  <div v-else class="container mx-auto min-h-screen max-w-3xl p-8">
    Page not found
  </div>
</template>
