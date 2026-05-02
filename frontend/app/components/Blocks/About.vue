<script setup lang="ts">
import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

const props = defineProps<{
  block: {
    sectionLabel?: string;
    headline?: string;
    leadPart1?: string;
    leadPartItalic?: string;
    leadPart2?: string;
    stats?: Array<{ _key: string; number: string; label: string }>;
    portrait?: SanityImageSource;
  };
}>();

const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;
</script>

<template>
  <section id="about" class="c-about">
    <div class="o-wrap">
      <div class="o-section-head">
        <div>
          <div class="o-section-head__num">{{ block.sectionLabel }}</div>
        </div>
        <h2 v-if="block.headline" class="o-section-head__lead">
          <WordReveal :text="block.headline" />
        </h2>
      </div>

      <div class="c-about__grid">
        <div>
          <p
            v-if="block.leadPart1 || block.leadPartItalic || block.leadPart2"
            class="c-about__lead"
          >
            <WordReveal v-if="block.leadPart1" :text="block.leadPart1" />
            {{ " " }}
            <span v-if="block.leadPartItalic" class="u-italic text-accent">
              <WordReveal :text="block.leadPartItalic" :delay="200" />
            </span>
            {{ " " }}
            <WordReveal
              v-if="block.leadPart2"
              :text="block.leadPart2"
              :delay="400"
            />
          </p>

          <RevealBlock
            v-if="block.stats?.length"
            class="c-about__stats"
            :stagger="true"
          >
            <div
              v-for="stat in block.stats"
              :key="stat._key"
              class="c-about__stat"
            >
              <div class="c-about__stat-num">{{ stat.number }}</div>
              <div class="c-about__stat-label">{{ stat.label }}</div>
            </div>
          </RevealBlock>
        </div>

        <RevealBlock>
          <div class="c-about__portrait">
            <img
              v-if="block.portrait"
              :src="
                urlFor(block.portrait)?.width(800).height(1000).url() ??
                undefined
              "
              alt="Portrait"
              class="c-about__portrait-img"
            />
            <div v-else class="c-about__portrait-placeholder">[ Portrait ]</div>
            <div class="c-about__name-tag">Founder · Sanitoju</div>
          </div>
        </RevealBlock>
      </div>
    </div>
  </section>
</template>

<style lang="postcss">
:where(.c-about) {
  @apply relative;
  padding: 96px 0;
}

:where(.c-about__grid) {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 96px;
  align-items: start;
}

@media (max-width: 900px) {
  :where(.c-about__grid) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
}

:where(.c-about__lead) {
  font-size: clamp(28px, 3.4vw, 48px);
  @apply font-headline;
  font-weight: 400;
  letter-spacing: -0.025em;
  line-height: 1.1;
}

:where(.c-about__stats) {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  margin-top: 48px;
}

:where(.c-about__stat) {
  border-top: 1px solid var(--line);
  padding: 24px 0;
}

:where(.c-about__stat-num) {
  @apply font-headline font-medium;
  font-size: 56px;
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: 12px;
}

:where(.c-about__stat-label) {
  @apply font-mono uppercase;
  font-size: 11px;
  letter-spacing: 0.14em;
  color: var(--muted);
}

:where(.c-about__portrait) {
  @apply relative flex items-end justify-start overflow-hidden;
  aspect-ratio: 4 / 5;
  background: var(--bg-deep);
  border-radius: 8px;
  padding: 24px;
}

:where(.c-about__portrait)::before {
  content: "";
  @apply absolute inset-0;
  background-image: repeating-linear-gradient(
    135deg,
    transparent 0 14px,
    color-mix(in oklab, var(--ink) 5%, transparent) 14px 15px
  );
}

:where(.c-about__portrait-img) {
  @apply absolute inset-0 w-full h-full object-cover;
}

:where(.c-about__portrait-placeholder) {
  @apply absolute inset-0 flex items-center justify-center font-mono uppercase;
  font-size: 12px;
  color: var(--muted);
  letter-spacing: 0.12em;
}

:where(.c-about__name-tag) {
  @apply relative z-[1] font-mono;
  background: var(--bg);
  padding: 10px 14px;
  border-radius: 6px;
  font-size: 12px;
  letter-spacing: 0.08em;
}
</style>
