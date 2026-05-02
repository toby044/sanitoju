import {defineField, defineType} from 'sanity'

export const servicesBlock = defineType({
  name: 'services',
  title: 'Services',
  type: 'object',
  fields: [
    defineField({name: 'sectionLabel', type: 'string'}),
    defineField({name: 'headlinePart1', type: 'string'}),
    defineField({name: 'headlinePart2', type: 'string', description: 'Rendered in italic'}),
    defineField({
      name: 'rows',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'serviceRow',
          fields: [
            defineField({name: 'name', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'description', type: 'text', rows: 3}),
          ],
          preview: {
            select: {title: 'name', subtitle: 'description'},
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Services'}),
  },
})
