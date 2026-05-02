import {defineType} from 'sanity'
import {mediaFields} from '../utils/mediaFields'

export const mediaBlock = defineType({
  name: 'mediaBlock',
  title: 'Media',
  type: 'object',
  fields: [...mediaFields],
  preview: {
    select: {media: 'image', mediaType: 'mediaType', title: 'alt', caption: 'caption'},
    prepare: ({media, mediaType, title, caption}) => ({
      media,
      title: title ?? caption ?? 'Media',
      subtitle: mediaType === 'video' ? 'Video' : 'Image',
    }),
  },
})
