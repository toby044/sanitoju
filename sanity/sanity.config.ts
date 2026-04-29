import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {createPageTreeDocumentList} from '@q42/sanity-plugin-page-tree'
import {schemaTypes} from './schemaTypes'
import {pageTreeConfig} from './pageTreeConfig'

const singletonTypes = new Set(['frontPage', 'settings'])

export default defineConfig({
  name: 'default',
  title: 'sanity-nuxt',

  projectId: 'u13uvw6c',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Website')
          .items([
            S.listItem()
              .title('Pages')
              .child(
                createPageTreeDocumentList(S, {
                  config: pageTreeConfig,
                  extendDocumentList: (builder) => builder.id('pages').title('Pages'),
                }),
              ),
            S.divider(),
            S.listItem()
              .title('Settings')
              .id('settings')
              .child(S.document().schemaType('settings').documentId('settings')),
            S.divider(),
            S.documentTypeListItem('event').title('Events'),
            S.documentTypeListItem('artist').title('Artists'),
            S.documentTypeListItem('venue').title('Venues'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },
})
