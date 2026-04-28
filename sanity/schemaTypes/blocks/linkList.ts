import {defineField, defineType} from 'sanity'

export const linkListBlock = defineType({
  name: 'linkListBlock',
  title: 'Link List',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
    }),
    defineField({name: 'link', title: 'Heading Link', type: 'link'}),
    defineField({
      name: 'links',
      type: 'array',
      validation: (r) => r.required().min(1),
      of: [
        {
          type: 'object',
          name: 'linkItem',
          fields: [
            defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'description', type: 'string'}),
            defineField({name: 'link', type: 'link', validation: (r) => r.required()}),
            defineField({
              name: 'icon',
              type: 'image',
              options: {accept: 'image/svg+xml,image/*'},
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'description'},
          },
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare: ({title}) => ({title: title ?? 'Link List', subtitle: 'Link List'}),
  },
})
