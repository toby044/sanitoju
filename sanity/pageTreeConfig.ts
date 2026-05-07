import type {PageTreeConfig} from '@q42/sanity-plugin-page-tree'

export const pageTreeConfig: PageTreeConfig = {
  rootSchemaType: 'frontPage',
  pageSchemaTypes: ['frontPage', 'contentPage', 'eventList', 'project'],
  titleFieldName: 'title',
}
