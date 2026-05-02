<script setup lang="ts">
defineProps<{
  block: {
    sectionLabel?: string
    headlinePart1?: string
    headlinePart2?: string
  }
}>()

const { data: posts } = useSanityQuery<Array<{
  _id: string
  title: string
  publishedAt: string
  topic?: string
  slug: { current: string }
}>>(`
  *[_type == "post"] | order(publishedAt desc) [0...4] {
    _id, title, publishedAt, topic, slug
  }
`)

function formatDate(dateStr: string) {
  const [year, month] = dateStr.split('-')
  return `${year} · ${month}`
}
</script>

<template>
  <section id="writing" class="c-writing">
    <div class="o-wrap">
      <div class="o-section-head">
        <div>
          <div class="o-section-head__num">{{ block.sectionLabel }}</div>
        </div>
        <h2 class="o-section-head__lead">
          <WordReveal v-if="block.headlinePart1" :text="block.headlinePart1" />
          {{ ' ' }}
          <span v-if="block.headlinePart2" class="u-italic">
            <WordReveal :text="block.headlinePart2" :delay="260" />
          </span>
        </h2>
      </div>

      <div v-if="posts?.length" class="c-writing__list">
        <NuxtLink
          v-for="post in posts"
          :key="post._id"
          :to="`/writing/${post.slug.current}`"
          class="c-writing__row"
        >
          <span class="c-writing__row-date">{{ formatDate(post.publishedAt) }}</span>
          <span class="c-writing__row-title">{{ post.title }}</span>
          <span class="c-writing__row-topic">{{ post.topic }}</span>
          <span class="c-writing__row-arrow"><ArrowIcon :size="16" /></span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style lang="postcss">
:where(.c-writing) {
  @apply relative;
  padding: 96px 0;
}

:where(.c-writing__list) {
  border-top: 1px solid var(--line);
}

:where(.c-writing__row) {
  display: grid;
  grid-template-columns: 100px 1fr 200px 60px;
  gap: 32px;
  padding: 28px 0;
  border-bottom: 1px solid var(--line);
  @apply items-center relative cursor-pointer;
  transition: padding 0.4s;
}

:where(.c-writing__row):hover { padding-left: 16px; }

:where(.c-writing__row-date) {
  @apply font-mono;
  font-size: 12px;
  color: var(--muted);
}

:where(.c-writing__row-title) {
  @apply font-headline font-medium;
  font-size: 22px;
  letter-spacing: -0.02em;
  transition: color 0.3s;
}

:where(.c-writing__row):hover .c-writing__row-title { color: var(--accent); }

:where(.c-writing__row-topic) {
  @apply font-mono uppercase;
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--muted);
}

:where(.c-writing__row-arrow) {
  @apply text-right;
  transition: transform 0.4s cubic-bezier(.22,.61,.36,1);
}

:where(.c-writing__row):hover .c-writing__row-arrow { transform: translateX(6px); }

@media (max-width: 720px) {
  :where(.c-writing__row) { grid-template-columns: 1fr; gap: 6px; padding: 20px 0; }
  :where(.c-writing__row-arrow) { @apply hidden; }
}
</style>
