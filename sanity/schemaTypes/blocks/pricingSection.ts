import {defineField, defineType} from 'sanity'

export const pricingBlock = defineType({
  name: 'pricing',
  title: 'Pricing',
  type: 'object',
  fields: [
    defineField({name: 'sectionLabel', type: 'string'}),
    defineField({name: 'headlinePart1', type: 'string'}),
    defineField({name: 'headlinePart2', type: 'string', description: 'Rendered in italic'}),
    defineField({
      name: 'tiers',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'tier',
          fields: [
            defineField({name: 'label', type: 'string', description: 'Badge text, e.g. "Most chosen"'}),
            defineField({name: 'name', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'price', type: 'string'}),
            defineField({name: 'suffix', type: 'string', description: 'e.g. "Fixed price · 2 weeks"'}),
            defineField({name: 'featured', type: 'boolean'}),
            defineField({name: 'items', title: 'Included items', type: 'array', of: [{type: 'string'}]}),
          ],
          preview: {
            select: {title: 'name', subtitle: 'price'},
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Pricing'}),
  },
})
