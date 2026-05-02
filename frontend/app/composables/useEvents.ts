import type { SanityDocument } from "@sanity/client";

export function useAllEvents() {
  return useSanityQuery<SanityDocument[]>(`*[_type == 'event']`);
}

export function useEventsWithType(type: string) {
  return useSanityQuery<SanityDocument[]>(
    `*[_type == 'event' && eventType == $type]`,
    { type },
  );
}
