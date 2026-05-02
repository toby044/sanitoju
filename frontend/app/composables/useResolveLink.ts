import type { SanityLink } from '~/composables/useSettings'

export async function useResolveLink() {
  const pageTree = usePageTree()
  const allPages = await pageTree.getAllPageMetadata()

  return function resolveLink(link: SanityLink | undefined): string {
    if (!link) return '#'
    if (link.linkType === 'external') return link.externalUrl ?? '#'
    const page = allPages.find((p) => p._id === link.internalLink?._id)
    return page?.path ?? '#'
  }
}
