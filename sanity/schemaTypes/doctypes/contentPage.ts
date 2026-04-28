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
      name: 'blocks',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'heroBlock',
        },
        {
          type: 'textBlock',
        },
        {
          type: 'mediaBlock',
        },
        {
          type: 'timelineBlock',
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
})
