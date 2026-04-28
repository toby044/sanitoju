<script setup lang="ts">
import { refDebounced } from "@vueuse/core";
import type { SanityDocument } from "@sanity/client";

const props = defineProps<{ document: SanityDocument }>();
useDocumentSeo(props.document);

const { data: eventTypes } = await useSanityQuery<string[]>(
  groq`array::unique(*[_type == "event" && defined(eventType)].eventType) | order(@)`,
);

const selectedType = ref<string | null>(null);
const searchInput = ref("");
const search = refDebounced(searchInput, 300);

const params = reactive<{
  eventType: string | null;
  dateFrom: string | null;
  dateTo: string | null;
  search: string | null;
}>({
  eventType: null,
  dateFrom: null,
  dateTo: null,
  search: null,
});

watchEffect(() => {
  const now = new Date().toISOString();
  params.eventType = selectedType.value ?? null;

  params.search = search.value ? `*${search.value}*` : null;
});

const EVENTS_QUERY = groq`*[
  _type == "event"
  && (!defined($eventType) || eventType == $eventType)
  && (!defined($dateFrom) || date >= $dateFrom)
  && (!defined($dateTo) || date < $dateTo)
  && (!defined($search) || name match $search)
] | order(date asc) {
  _id, name, slug, date, eventType, image
}`;

const { data: events } = useSanityQuery<SanityDocument[]>(EVENTS_QUERY, params);
</script>

<template>
  <main>
    <BlockList v-if="document.blocks?.length" :blocks="document.blocks" />

    <section class="container mx-auto max-w-3xl px-8 py-12">
      <div class="mb-8 flex flex-col gap-4">
        <input
          v-model="searchInput"
          type="search"
          placeholder="Search events..."
          class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />

        <div class="flex flex-wrap items-center gap-4">
          <select
            v-model="selectedType"
            class="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option :value="null">All types</option>
            <option v-for="type in eventTypes" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </div>
      </div>

      <ul v-if="events?.length" class="flex flex-col gap-y-4">
        <li v-for="event in events" :key="event._id">
          <nuxt-link :to="`/${event.slug.current}`" class="hover:underline">
            <h2 class="text-xl font-semibold">{{ event.name }}</h2>
            <p class="text-sm text-gray-600">
              {{ new Date(event.date).toLocaleDateString() }} —
              {{ event.eventType }}
            </p>
          </nuxt-link>
        </li>
      </ul>

      <p v-else class="text-gray-500">No events found.</p>
    </section>
  </main>
</template>
