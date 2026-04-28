import {defineField, defineType} from 'sanity'

export const textBlock = defineType({
  name: 'textBlock',
  title: 'Text',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      type: 'array',
      of: [{type: 'block'}],
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: {content: 'content'},
    prepare: ({content}) => ({
      title: content?.[0]?.children?.[0]?.text ?? 'Text block',
      subtitle: 'Text',
    }),
  },
})
