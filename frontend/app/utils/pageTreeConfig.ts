import type { PageTreeConfig } from '@q42/sanity-plugin-page-tree/client'

export const pageTreeConfig: PageTreeConfig = {
  rootSchemaType: 'frontPage',
  pageSchemaTypes: ['frontPage', 'contentPage', 'eventList'],
  titleFieldName: 'title',
}
