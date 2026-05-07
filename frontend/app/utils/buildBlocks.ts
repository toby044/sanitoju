export type BuildBlockId =
  | 'hero'
  | 'marquee'
  | 'showcase'
  | 'work'
  | 'services'
  | 'process'
  | 'about'
  | 'pricing'
  | 'writing'
  | 'media'
  | 'text'
  | 'contact'

export type BuildBlock = {
  id: BuildBlockId
  name: string
  category: 'Anchor' | 'Accent' | 'Story' | 'Body'
  blurb: string
  price: number
  days: number
  complexity: 'Light' | 'Standard' | 'Premium'
}

export const BUILD_BLOCKS: BuildBlock[] = [
  { id: 'hero', name: 'Hero', category: 'Anchor', blurb: 'Above-the-fold statement. Display headline, supporting line, primary CTA, optional status pill.', price: 1200, days: 1.5, complexity: 'Standard' },
  { id: 'marquee', name: 'Marquee', category: 'Accent', blurb: 'Infinite horizontal ticker. Used between sections to set tone — words, services, or values.', price: 350, days: 0.5, complexity: 'Light' },
  { id: 'showcase', name: 'Showcase', category: 'Story', blurb: 'Featured project with full-bleed art, label, year, and inline meta. One per page, max.', price: 1400, days: 1.5, complexity: 'Standard' },
  { id: 'work', name: 'Work Grid', category: 'Story', blurb: '12-column work grid with mixed spans. Hover thumb-zoom, project tags, year stamps.', price: 1800, days: 2, complexity: 'Premium' },
  { id: 'services', name: 'Services', category: 'Body', blurb: 'Numbered service rows with hover-fill behavior. Up to eight rows, with descriptions.', price: 900, days: 1, complexity: 'Standard' },
  { id: 'process', name: 'Process', category: 'Body', blurb: 'Four-step process strip on inverted background. Step number, title, description, tag.', price: 1100, days: 1.25, complexity: 'Standard' },
  { id: 'about', name: 'About', category: 'Body', blurb: 'Editorial about block — lead paragraph, portrait/placeholder, two-up stats.', price: 800, days: 1, complexity: 'Standard' },
  { id: 'pricing', name: 'Pricing', category: 'Body', blurb: 'Three-tier pricing card grid. Featured tier with inverted treatment, ticked feature lists.', price: 950, days: 1.25, complexity: 'Standard' },
  { id: 'writing', name: 'Writing', category: 'Body', blurb: 'Recent writing list — date, title, topic. Clean rows with hover indent.', price: 600, days: 0.75, complexity: 'Light' },
  { id: 'media', name: 'Media', category: 'Accent', blurb: 'Full-bleed video or image with optional caption. Pairs well with Showcase.', price: 700, days: 0.75, complexity: 'Light' },
  { id: 'text', name: 'Text', category: 'Body', blurb: 'Long-form prose block. Drop caps, pull quotes, narrow measure for readability.', price: 450, days: 0.5, complexity: 'Light' },
  { id: 'contact', name: 'Contact', category: 'Anchor', blurb: 'Closing contact section — oversized headline, three contact cells, primary CTA.', price: 850, days: 1, complexity: 'Standard' },
]

export const BUILD_DEFAULTS = {
  currency: 'EUR' as const,
  discountPct: 8,
  discountThreshold: 5,
}

export function formatBuildPrice(amount: number): string {
  const v = Math.round(amount)
  return `€${new Intl.NumberFormat('en-IE', { maximumFractionDigits: 0 }).format(v)}`
}

export function findBlock(id: string): BuildBlock | undefined {
  return BUILD_BLOCKS.find((b) => b.id === id)
}
