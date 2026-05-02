import {defineField, defineType} from 'sanity'

export const workBlock = defineType({
  name: 'work',
  title: 'Work',
  type: 'object',
  fields: [
    defineField({name: 'sectionLabel', type: 'string'}),
    defineField({name: 'headlinePart1', type: 'string'}),
    defineField({name: 'headlinePart2', type: 'string', description: 'Rendered in italic'}),
    defineField({
      name: 'items',
      title: 'Work items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'workItem',
          fields: [
            defineField({name: 'tag', type: 'string', description: 'e.g. "01 / Brand & web"'}),
            defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'year', type: 'string'}),
            defineField({name: 'projectType', title: 'Project type', type: 'string'}),
            defineField({
              name: 'span',
              type: 'number',
              options: {
                list: [
                  {title: 'Narrow (5 cols)', value: 5},
                  {title: 'Wide (7 cols)', value: 7},
                  {title: 'Full width (12 cols)', value: 12},
                ],
              },
            }),
            defineField({name: 'thumbnail', type: 'image', options: {hotspot: true}}),
          ],
          preview: {
            select: {title: 'title', subtitle: 'projectType', media: 'thumbnail'},
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Work'}),
  },
})
