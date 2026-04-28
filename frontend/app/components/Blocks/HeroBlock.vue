<script setup lang="ts">
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

const props = defineProps<{
  block: {
    heading: string;
    subheading?: string;
    image?: SanityImageSource;
    ctaLabel?: string;
    ctaLink?: string;
  };
}>();

const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;
</script>

<template>
  <section class="relative flex flex-col items-center text-center py-24 gap-6">
    <img
      v-if="block.image"
      :src="urlFor(block.image)?.width(1400).height(600).url()"
      alt=""
      class="absolute inset-0 w-full h-full object-cover -z-10 brightness-50"
    />
    <h1 class="text-5xl font-bold">{{ block.heading }}</h1>
    <p v-if="block.subheading" class="text-xl max-w-2xl">{{ block.subheading }}</p>
    <a
      v-if="block.ctaLabel && block.ctaLink"
      :href="block.ctaLink"
      class="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100"
    >
      {{ block.ctaLabel }}
    </a>
  </section>
</template>
