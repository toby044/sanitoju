import {defineField} from 'sanity'
import {defineDoctype} from '../utils/defineDoctype'

export const projectType = defineDoctype({
  name: 'project',
  title: 'Project',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'content',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Short summary used on cards and as a meta description fallback.',
    }),
    defineField({
      name: 'year',
      type: 'string',
      group: 'content',
      description: 'e.g. "2025" or "2024–2025"',
    }),
    defineField({
      name: 'role',
      type: 'string',
      group: 'content',
      description: 'Your role on this project, e.g. "Frontend Developer".',
    }),
    defineField({
      name: 'client',
      type: 'string',
      group: 'content',
      description: 'Employer, agency, or client name.',
    }),
    defineField({
      name: 'projectType',
      title: 'Project type',
      type: 'string',
      group: 'content',
      description: 'e.g. "Design system", "Brand & web".',
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{type: 'string'}],
      group: 'content',
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'thumbnail',
      type: 'image',
      options: {hotspot: true},
      group: 'content',
      description: 'Card image used on the Showcase block.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'cover',
      type: 'image',
      options: {hotspot: true},
      group: 'content',
      description: 'Large media at the top of the project page.',
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live URL',
      type: 'url',
      group: 'content',
    }),
    defineField({
      name: 'repoUrl',
      title: 'Repository URL',
      type: 'url',
      group: 'content',
    }),
    defineField({
      name: 'blocks',
      type: 'array',
      group: 'content',
      of: [
        {type: 'textBlock'},
        {type: 'mediaBlock'},
        {type: 'mediaGalleryBlock'},
        {type: 'linkListBlock'},
        {type: 'timelineBlock'},
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'client', media: 'thumbnail'},
  },
})
