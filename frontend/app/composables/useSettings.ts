export interface SanityLink {
  linkType: 'internal' | 'external'
  internalLink?: { _id: string; title?: string }
  externalUrl?: string
  openInNewTab?: boolean
}

export interface NavLink {
  _key: string
  label: string
  link: SanityLink
}

export interface SiteSettings {
  studioName: string
  navLinks: NavLink[]
  ctaLabel: string
  ctaLink: SanityLink
  tagline: string
  email: string
  location: string
  foundedYear: number
  footerTagline: string
}

export function useSettings() {
  return useSanityQuery<SiteSettings>(
    groq`*[_type == "settings"][0]{
      studioName,
      navLinks[]{
        _key,
        label,
        link{
          linkType,
          internalLink->{_id, title},
          externalUrl,
          openInNewTab
        }
      },
      ctaLabel,
      ctaLink{
        linkType,
        internalLink->{_id, title},
        externalUrl,
        openInNewTab
      },
      tagline,
      email,
      location,
      foundedYear,
      footerTagline
    }`,
  )
}
