import {defineField} from 'sanity'
import {defineDoctype} from '../utils/defineDoctype'

export const contentPageType = defineDoctype({
  name: 'contentPage',
  title: 'Content Page',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'content',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'showHeader',
      type: 'boolean',
      group: 'settings',
      description: 'Hides the title/description part of the content page.',
    }),
    defineField({
      name: 'description',
      type: 'text',
      group: 'content',
    }),
    defineField({
      name: 'blocks',
      type: 'array',
      group: 'content',
      of: [
        {type: 'marquee'},
        {type: 'work'},
        {type: 'services'},
        {type: 'about'},
        {type: 'process'},
        {type: 'pricing'},
        {type: 'writing'},
        {type: 'contact'},
        {type: 'textBlock'},
        {type: 'mediaBlock'},
        {type: 'linkListBlock'},
        {type: 'mediaGalleryBlock'},
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  initialValue: {
    showHeader: true,
  },
})
