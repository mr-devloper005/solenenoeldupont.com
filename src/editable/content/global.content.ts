import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const uiHiddenTaskKeys = ['profile'] as const
export const isUiHiddenTask = (key: string) => (uiHiddenTaskKeys as readonly string[]).includes(key)

export const collectionShortcuts = [
  { name: 'Design & Tools', slug: 'design' },
  { name: 'Developer Reads', slug: 'developer' },
  { name: 'Marketing Playbooks', slug: 'marketing' },
  { name: 'Startup Stories', slug: 'startup' },
  { name: 'AI & Research', slug: 'ai' },
  { name: 'Productivity', slug: 'productivity' },
  { name: 'No-code Kits', slug: 'no-code' },
  { name: 'Learning', slug: 'learning' },
] as const

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Curated finds and handpicked links',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Curated finds daily',
    primaryLinks: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Submit a link', href: '/contact' },
      secondary: { label: 'Browse the finds', href: '/sbm' },
    },
  },
  footer: {
    tagline: 'Curated finds daily',
    description:
      'A curated home for the internet’s most useful bookmarks. Every link is reviewed, tagged, and shelved into a collection so discovery stays calm.',
    columns: [
      {
        title: 'Site',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Handpicked links, quietly organized.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'Browse all',
    explore: 'Browse',
    latest: 'Freshly saved',
    related: 'From the same shelf',
    published: 'Added',
  },
} as const
