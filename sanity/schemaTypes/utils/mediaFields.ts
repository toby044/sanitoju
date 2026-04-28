import {defineField} from 'sanity'

export const mediaFields = [
  defineField({
    name: 'mediaType',
    title: 'Media Type',
    type: 'string',
    options: {
      list: [
        {
          title: 'Image',
          value: 'image',
        },
        {
          title: 'Video',
          value: 'video',
        },
      ],
      layout: 'radio',
    },
    initialValue: 'image',
  }),
  defineField({
    name: 'image',
    type: 'image',
    options: {hotspot: true},
    hidden: ({parent}) => parent?.mediaType !== 'image',
    validation: (r) =>
      r.custom((value, ctx) => {
        const parent = ctx.parent as {mediaType?: string}
        if (parent?.mediaType === 'image' && !value) return 'Image is required'
        return true
      }),
  }),
  defineField({
    name: 'alt',
    title: 'Alt Text',
    type: 'string',
    hidden: ({parent}) => parent?.mediaType !== 'image',
  }),
  defineField({
    name: 'video',
    title: 'Video File',
    type: 'file',
    options: {accept: 'video/*'},
    hidden: ({parent}) => parent?.mediaType !== 'video',
    validation: (r) =>
      r.custom((value, ctx) => {
        const parent = ctx.parent as {mediaType?: string}
        if (parent?.mediaType === 'video' && !value) return 'Video file is required'
        return true
      }),
  }),
  defineField({
    name: 'videoUrl',
    title: 'Video URL (YouTube / Vimeo)',
    type: 'url',
    hidden: ({parent}) => parent?.mediaType !== 'video',
  }),
  defineField({
    name: 'caption',
    type: 'string',
  }),
]
