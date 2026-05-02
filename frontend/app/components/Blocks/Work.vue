<script setup lang="ts">
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

const props = defineProps<{
  block: {
    sectionLabel?: string
    headlinePart1?: string
    headlinePart2?: string
    items?: Array<{
      _key: string
      tag?: string
      title: string
      year?: string
      projectType?: string
      span?: number
      thumbnail?: SanityImageSource
    }>
  }
}>()

const { projectId, dataset } = useSanity().client.config()
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null
</script>

<template>
  <section id="work" class="c-work">
    <div class="o-wrap">
      <div class="o-section-head">
        <div>
          <div class="o-section-head__num">{{ block.sectionLabel }}</div>
        </div>
        <h2 class="o-section-head__lead">
          <WordReveal v-if="block.headlinePart1" :text="block.headlinePart1" />
          {{ ' ' }}
          <span v-if="block.headlinePart2" class="u-italic">
            <WordReveal :text="block.headlinePart2" :delay="300" />
          </span>
        </h2>
      </div>

      <div v-if="block.items?.length" class="c-work__grid">
        <RevealBlock
          v-for="item in block.items"
          :key="item._key"
          as="a"
          :class="`c-work__card c-work__card--span-${item.span ?? 6}`"
        >
          <div class="c-work__thumb">
            <div class="c-work__thumb-art">
              <img
                v-if="item.thumbnail"
                :src="urlFor(item.thumbnail)?.width(800).height(600).url() ?? undefined"
                :alt="item.title"
                class="c-work__thumb-img"
              />
            </div>
            <span class="c-work__pill">{{ item.tag }}</span>
            <span class="c-work__year">{{ item.year }}</span>
          </div>
          <div class="c-work__meta">
            <span class="c-work__title">{{ item.title }}</span>
            <span class="c-work__tag">{{ item.projectType }}</span>
          </div>
        </RevealBlock>
      </div>
    </div>
  </section>
</template>

<style lang="postcss">
:where(.c-work) {
  @apply relative;
  padding: 96px 0;
}

:where(.c-work__grid) {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 32px;
}

:where(.c-work__card) {
  @apply relative cursor-pointer block;
}

:where(.c-work__card--span-7) { grid-column: span 7; }
:where(.c-work__card--span-5) { grid-column: span 5; }
:where(.c-work__card--span-6) { grid-column: span 6; }
:where(.c-work__card--span-12) { grid-column: span 12; }

@media (max-width: 900px) {
  :where(.c-work__card--span-7),
  :where(.c-work__card--span-5),
  :where(.c-work__card--span-6),
  :where(.c-work__card--span-12) { grid-column: span 12; }
}

:where(.c-work__thumb) {
  @apply relative w-full overflow-hidden;
  aspect-ratio: 4 / 3;
  background: var(--bg-deep);
  border-radius: 8px;
  transition: transform 0.7s cubic-bezier(.22,.61,.36,1);
}

:where(.c-work__card--span-12 .c-work__thumb) { aspect-ratio: 16 / 7; }
:where(.c-work__card):hover .c-work__thumb { transform: scale(0.985); }

:where(.c-work__thumb-art) {
  @apply absolute inset-0 flex items-center justify-center;
  transition: transform 1.2s cubic-bezier(.22,.61,.36,1);
}

:where(.c-work__card):hover .c-work__thumb-art { transform: scale(1.06); }

:where(.c-work__thumb-img) {
  @apply absolute inset-0 w-full h-full object-cover;
}

:where(.c-work__pill) {
  @apply absolute font-mono uppercase;
  top: 18px;
  left: 18px;
  padding: 6px 12px;
  font-size: 11px;
  letter-spacing: 0.1em;
  background: rgba(255, 255, 255, 0.85);
  color: #0E0E0E;
  border-radius: 999px;
  backdrop-filter: blur(8px);
}

:where(.c-work__year) {
  @apply absolute font-mono;
  top: 18px;
  right: 18px;
  font-size: 11px;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.7);
}

:where(.c-work__meta) {
  @apply flex justify-between items-baseline gap-4;
  margin-top: 18px;
}

:where(.c-work__title) {
  @apply font-headline font-medium;
  font-size: 22px;
  letter-spacing: -0.02em;
}

:where(.c-work__tag) {
  @apply font-mono uppercase;
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--muted);
}
</style>
