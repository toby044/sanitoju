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
      title: 'Showcase items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'workItem',
          fields: [
            defineField({
              name: 'project',
              type: 'reference',
              to: [{type: 'project'}],
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'span',
              type: 'number',
              description: 'Layout span on the 12-column grid.',
              options: {
                list: [
                  {title: 'Narrow (5 cols)', value: 5},
                  {title: 'Wide (7 cols)', value: 7},
                  {title: 'Full width (12 cols)', value: 12},
                ],
              },
            }),
          ],
          preview: {
            select: {
              title: 'project.title',
              subtitle: 'project.projectType',
              media: 'project.thumbnail',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Work'}),
  },
})
