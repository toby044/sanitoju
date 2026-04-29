import {defineField, defineType} from 'sanity'

export const heroBlock = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', type: 'string'}),
    defineField({
      name: 'headlineLines',
      title: 'Headline Lines',
      description: 'Each line of the large headline. Toggle italic for serif lines.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'line',
          fields: [
            defineField({name: 'text', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'italic', type: 'boolean'}),
          ],
          preview: {
            select: {title: 'text', italic: 'italic'},
            prepare: ({title, italic}: any) => ({title, subtitle: italic ? 'Italic' : ''}),
          },
        },
      ],
    }),
    defineField({name: 'practiceLabel', type: 'string'}),
    defineField({name: 'practiceText', type: 'text', rows: 3}),
    defineField({name: 'currentLabel', type: 'string'}),
    defineField({name: 'currentText', type: 'text', rows: 2}),
    defineField({name: 'statusText', type: 'string'}),
  ],
  preview: {
    select: {title: 'eyebrow'},
    prepare: ({title}: any) => ({title: title || 'Hero', subtitle: 'Hero'}),
  },
})
