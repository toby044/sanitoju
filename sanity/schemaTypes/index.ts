import {eventType} from './eventType'
import {artistType} from './artistType'
import {venueType} from './venueType'

// Doctypes
import {frontPageType} from './doctypes/frontPage'
import {contentPageType} from './doctypes/contentPage'
import {eventListType} from './doctypes/eventList'

// Block types
import {heroBlock} from './blocks/hero'
import {textBlock} from './blocks/text'
import {mediaBlock} from './blocks/media'
import {linkListBlock} from './blocks/linkList'
import {mediaGalleryBlock} from './blocks/mediaGallery'
import {timelineBlock} from './blocks/timeline'

// Object types
import {seoType} from './objects/seo'
import {linkType} from './objects/link'

export const schemaTypes = [
  // Doctypes
  frontPageType,
  contentPageType,
  eventListType,

  // Blocks
  heroBlock,
  textBlock,
  mediaBlock,
  linkListBlock,
  mediaGalleryBlock,
  timelineBlock,

  // Objects
  seoType,
  linkType,

  // Existing types
  eventType,
  artistType,
  venueType,
]
