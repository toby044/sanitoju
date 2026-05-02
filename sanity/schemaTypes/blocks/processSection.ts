import {defineField, defineType} from 'sanity'

export const processBlock = defineType({
  name: 'process',
  title: 'Process',
  type: 'object',
  fields: [
    defineField({name: 'sectionLabel', type: 'string'}),
    defineField({name: 'headline', type: 'string'}),
    defineField({
      name: 'steps',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'step',
          fields: [
            defineField({name: 'name', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'description', type: 'text', rows: 3}),
            defineField({name: 'tag', type: 'string', description: 'Timeline label, e.g. "Week 0"'}),
          ],
          preview: {
            select: {title: 'name', subtitle: 'tag'},
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Process'}),
  },
})
