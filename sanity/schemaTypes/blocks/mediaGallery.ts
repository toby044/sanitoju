import {defineField, defineType} from 'sanity'
import {mediaFields} from '../utils/mediaFields'

export const mediaGalleryBlock = defineType({
  name: 'mediaGalleryBlock',
  title: 'Media Gallery',
  type: 'object',
  fields: [
    defineField({name: 'heading', type: 'string'}),
    defineField({name: 'link', title: 'Heading Link', type: 'link'}),
    defineField({
      name: 'items',
      type: 'array',
      validation: (r) => r.required().min(1),
      of: [
        {
          type: 'object',
          name: 'mediaItem',
          fields: [
            defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'description', type: 'string'}),
            defineField({name: 'link', type: 'link'}),
            defineField({
              name: 'icon',
              type: 'image',
              options: {accept: 'image/svg+xml,image/*'},
            }),
            ...mediaFields,
          ],
          preview: {
            select: {title: 'title', subtitle: 'description', media: 'image'},
            prepare: ({title, subtitle, media}) => ({
              title: title ?? 'Media Item',
              subtitle,
              media,
            }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare: ({title}) => ({title: title ?? 'Media Gallery', subtitle: 'Media Gallery'}),
  },
})
