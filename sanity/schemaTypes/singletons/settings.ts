import {defineField, defineType} from 'sanity'

export const settingsType = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  groups: [
    {name: 'header', title: 'Header'},
    {name: 'footer', title: 'Footer'},
  ],
  fields: [
    // Header
    defineField({
      name: 'studioName',
      title: 'Studio Name',
      type: 'string',
      group: 'header',
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      group: 'header',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string'}),
            defineField({name: 'link', title: 'Link', type: 'link'}),
          ],
          preview: {
            select: {title: 'label', linkType: 'link.linkType', externalUrl: 'link.externalUrl', internalTitle: 'link.internalLink.title'},
            prepare: ({title, linkType, externalUrl, internalTitle}) => ({
              title,
              subtitle: linkType === 'internal' ? internalTitle : externalUrl,
            }),
          },
        },
      ],
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      group: 'header',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'link',
      group: 'header',
    }),

    // Footer
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'foundedYear',
      title: 'Founded Year',
      type: 'number',
      group: 'footer',
    }),
    defineField({
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'string',
      group: 'footer',
    }),
  ],
})
