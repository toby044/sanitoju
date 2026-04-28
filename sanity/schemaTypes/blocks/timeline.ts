import {defineField, defineType} from 'sanity'

export const timelineBlock = defineType({
  name: 'timelineBlock',
  title: 'Timeline',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'string',
    }),
    defineField({
      name: 'items',
      type: 'array',
      validation: (r) => r.required().min(1),
      of: [
        {
          type: 'object',
          name: 'timelineItem',
          fields: [
            defineField({
              name: 'date',
              type: 'date',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'category',
              type: 'string',
            }),
            defineField({
              name: 'description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
          ],
          preview: {
            select: {
              title: 'date',
              subtitle: 'category',
              media: 'image',
            },
            prepare: ({title, subtitle, media}) => ({
              title: title ?? 'Timeline Item',
              subtitle,
              media,
            }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({
      title: title ?? 'Timeline',
      subtitle: 'Timeline',
    }),
  },
})
