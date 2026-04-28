import {defineField, defineType} from 'sanity'
import {pageTreeConfig} from '../../pageTreeConfig'

export const linkType = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          {title: 'Internal page', value: 'internal'},
          {title: 'External URL', value: 'external'},
        ],
        layout: 'radio',
      },
      initialValue: 'internal',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'internalLink',
      title: 'Page',
      type: 'reference',
      to: pageTreeConfig.pageSchemaTypes.map((type) => ({type})),
      hidden: ({parent}) => parent?.linkType !== 'internal',
      validation: (r) =>
        r.custom((value, ctx) => {
          const parent = ctx.parent as {linkType?: string}
          if (parent?.linkType === 'internal' && !value) return 'Select a page'
          return true
        }),
    }),
    defineField({
      name: 'externalUrl',
      title: 'URL',
      type: 'url',
      hidden: ({parent}) => parent?.linkType !== 'external',
      validation: (r) =>
        r.custom((value, ctx) => {
          const parent = ctx.parent as {linkType?: string}
          if (parent?.linkType === 'external' && !value) return 'Enter a URL'
          return true
        }),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      linkType: 'linkType',
      internalTitle: 'internalLink.title',
      externalUrl: 'externalUrl',
    },
    prepare: ({linkType, internalTitle, externalUrl}) => ({
      title: linkType === 'internal' ? (internalTitle ?? 'Internal link') : (externalUrl ?? 'External link'),
      subtitle: linkType === 'internal' ? 'Internal' : 'External',
    }),
  },
})
