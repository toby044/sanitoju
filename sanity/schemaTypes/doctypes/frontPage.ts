import {defineField} from 'sanity'
import {defineDoctype} from '../utils/defineDoctype'

export const frontPageType = defineDoctype(
  {
    name: 'frontPage',
    title: 'Front Page',
    fields: [
      defineField({
        name: 'title',
        type: 'string',
        group: 'content',
        initialValue: 'Front Page',
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
            type: 'linkListBlock',
          },
          {
            type: 'mediaGalleryBlock',
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
  },
  {isRoot: true},
)
