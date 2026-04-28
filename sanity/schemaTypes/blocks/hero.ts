import {defineField, defineType} from 'sanity'

export const heroBlock = defineType({
  name: 'heroBlock',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({name: 'heading', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'subheading', type: 'string'}),
    defineField({name: 'image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'ctaLabel', title: 'CTA Label', type: 'string'}),
    defineField({name: 'ctaLink', title: 'CTA Link', type: 'link'}),
  ],
  preview: {
    select: {title: 'heading'},
    prepare: ({title}) => ({title, subtitle: 'Hero'}),
  },
})
