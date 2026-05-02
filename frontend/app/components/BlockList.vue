<script setup lang="ts">
import Hero from "~/components/Blocks/Hero.vue";
import Marquee from "~/components/Blocks/Marquee.vue";
import Work from "~/components/Blocks/Work.vue";
import Services from "~/components/Blocks/Services.vue";
import About from "~/components/Blocks/About.vue";
import Process from "~/components/Blocks/Process.vue";
import Pricing from "~/components/Blocks/Pricing.vue";
import Writing from "~/components/Blocks/Writing.vue";
import Contact from "~/components/Blocks/Contact.vue";

defineProps<{
  blocks: Array<{ _type: string; _key: string; [key: string]: unknown }>;
}>();

const componentMap: Record<string, Component> = {
  hero: Hero,
  marquee: Marquee,
  work: Work,
  services: Services,
  about: About,
  process: Process,
  pricing: Pricing,
  writing: Writing,
  contact: Contact,
};
</script>

<template>
  <template v-for="block in blocks" :key="block._key">
    <component
      :is="componentMap[block._type]"
      v-if="componentMap[block._type]"
      :block="block"
    />
  </template>
</template>
