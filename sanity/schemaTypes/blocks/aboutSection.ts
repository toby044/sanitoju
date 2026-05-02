import {defineField, defineType} from 'sanity'

export const aboutBlock = defineType({
  name: 'about',
  title: 'About',
  type: 'object',
  fields: [
    defineField({name: 'sectionLabel', type: 'string'}),
    defineField({name: 'headline', type: 'string'}),
    defineField({name: 'leadPart1', title: 'Lead — first part', type: 'text', rows: 2}),
    defineField({name: 'leadPartItalic', title: 'Lead — italic accent', type: 'string'}),
    defineField({name: 'leadPart2', title: 'Lead — closing part', type: 'text', rows: 2}),
    defineField({
      name: 'stats',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'stat',
          fields: [
            defineField({name: 'number', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'label', type: 'string', validation: (r) => r.required()}),
          ],
          preview: {
            select: {title: 'number', subtitle: 'label'},
          },
        },
      ],
    }),
    defineField({name: 'portrait', type: 'image', options: {hotspot: true}}),
  ],
  preview: {
    prepare: () => ({title: 'About'}),
  },
})
