import { createPageTreeClient } from '@q42/sanity-plugin-page-tree/client'
import { pageTreeConfig } from '~/utils/pageTreeConfig'

export const usePageTree = () => {
  const { client } = useSanity()
  return createPageTreeClient({ config: pageTreeConfig, client })
}
