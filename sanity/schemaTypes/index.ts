import {settingsType} from './singletons/settings'
import {eventType} from './eventType'
import {artistType} from './artistType'
import {venueType} from './venueType'

// Doctypes
import {frontPageType} from './doctypes/frontPage'
import {contentPageType} from './doctypes/contentPage'
import {eventListType} from './doctypes/eventList'
import {postType} from './doctypes/post'

// Generic block types
import {textBlock} from './blocks/text'
import {mediaBlock} from './blocks/media'
import {linkListBlock} from './blocks/linkList'
import {mediaGalleryBlock} from './blocks/mediaGallery'
import {timelineBlock} from './blocks/timeline'

// Landing page section blocks
import {heroBlock} from './blocks/heroSection'
import {marqueeBlock} from './blocks/marqueeSection'
import {workBlock} from './blocks/workSection'
import {servicesBlock} from './blocks/servicesSection'
import {aboutBlock} from './blocks/aboutSection'
import {processBlock} from './blocks/processSection'
import {pricingBlock} from './blocks/pricingSection'
import {writingBlock} from './blocks/writingSection'
import {contactBlock} from './blocks/contactSection'

// Object types
import {seoType} from './objects/seo'
import {linkType} from './objects/link'

export const schemaTypes = [
  // Singletons
  settingsType,

  // Doctypes
  frontPageType,
  contentPageType,
  eventListType,
  postType,

  // Generic blocks (used on content pages)
  textBlock,
  mediaBlock,
  linkListBlock,
  mediaGalleryBlock,
  timelineBlock,

  // Landing page section blocks
  heroBlock,
  marqueeBlock,
  workBlock,
  servicesBlock,
  aboutBlock,
  processBlock,
  pricingBlock,
  writingBlock,
  contactBlock,

  // Objects
  seoType,
  linkType,

  // Existing types
  eventType,
  artistType,
  venueType,
]
