import type { SanityDocument } from '@sanity/client'
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

export const useDocumentSeo = (document: SanityDocument | null | undefined) => {
  const { projectId, dataset } = useSanity().client.config()
  const urlFor = (source: SanityImageSource) =>
    projectId && dataset
      ? createImageUrlBuilder({ projectId, dataset }).image(source)
      : null

  const seo = document?.seo

  useSeoMeta({
    title: seo?.metaTitle || document?.title,
    description: seo?.metaDescription,
    ogTitle: seo?.metaTitle || document?.title,
    ogDescription: seo?.metaDescription,
    ogImage: seo?.ogImage ? urlFor(seo.ogImage)?.width(1200).height(630).url() : undefined,
    robots: seo?.noIndex ? 'noindex, nofollow' : 'index, follow',
  })
}
