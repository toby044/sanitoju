<script setup lang="ts">
import HeroBlock from "~/components/Blocks/HeroBlock.vue";
import TextBlock from "~/components/Blocks/TextBlock.vue";
import MediaBlock from "~/components/Blocks/MediaBlock.vue";

defineProps<{
  blocks: Array<{ _type: string; _key: string; [key: string]: unknown }>;
}>();

const componentMap: Record<string, Component> = {
  heroBlock: HeroBlock,
  textBlock: TextBlock,
  mediaBlock: MediaBlock,
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
