import {defineField, defineType} from 'sanity'

export const marqueeBlock = defineType({
  name: 'marquee',
  title: 'Marquee',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Scrolling items',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Marquee', subtitle: 'Scrolling ticker'}),
  },
})
