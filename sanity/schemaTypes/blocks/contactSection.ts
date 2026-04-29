import {defineField, defineType} from 'sanity'

export const contactBlock = defineType({
  name: 'contact',
  title: 'Contact',
  type: 'object',
  fields: [
    defineField({name: 'sectionLabel', type: 'string'}),
    defineField({
      name: 'headlineLines',
      title: 'Headline Lines',
      description: 'Each line of the big headline. Toggle italic for serif lines.',
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
    defineField({name: 'email', type: 'string'}),
    defineField({
      name: 'contactItems',
      title: 'Contact grid',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'contactItem',
          fields: [
            defineField({name: 'label', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'value', type: 'string'}),
            defineField({name: 'sub', type: 'string', description: 'Small caption below the value'}),
          ],
          preview: {
            select: {title: 'label', subtitle: 'value'},
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Contact'}),
  },
})
