import {defineField} from 'sanity'
import {defineDoctype} from '../utils/defineDoctype'

export const eventListType = defineDoctype({
  name: 'eventList',
  title: 'Event List',
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
