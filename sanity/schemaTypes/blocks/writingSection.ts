import {defineField, defineType} from 'sanity'

export const writingBlock = defineType({
  name: 'writing',
  title: 'Writing',
  type: 'object',
  fields: [
    defineField({name: 'sectionLabel', type: 'string'}),
    defineField({name: 'headlinePart1', type: 'string'}),
    defineField({
      name: 'headlinePart2',
      type: 'string',
      description: 'Rendered in italic. Posts are pulled automatically from the Writing section.',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Writing'}),
  },
})
