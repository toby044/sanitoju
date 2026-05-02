<script setup lang="ts">
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

const props = defineProps<{
  block: {
    image: SanityImageSource;
    alt: string;
    caption?: string;
  };
}>();

const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;
</script>

<template>
  <figure class="container mx-auto max-w-3xl px-8 py-8">
    <img
      :src="urlFor(block.image)?.width(900).url()"
      :alt="block.alt"
      class="w-full rounded-xl"
    />
    <figcaption v-if="block.caption" class="text-sm text-gray-500 mt-2 text-center">
      {{ block.caption }}
    </figcaption>
  </figure>
</template>
