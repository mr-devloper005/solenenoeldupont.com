import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Curated finds, handpicked links',
      description: 'A quietly curated home for the web’s most useful bookmarks — every link vetted, tagged, and shelved into a collection.',
      openGraphTitle: 'Curated finds, handpicked links',
      openGraphDescription: 'Discover vetted bookmarks and resources shelved into calm, browseable collections.',
      keywords: ['bookmarks', 'curated links', 'collections', 'resources', 'discovery'],
    },
    hero: {
      badge: 'Curated finds · Handpicked links',
      title: ['A quiet home for the', 'internet’s best links.'],
      description:
        'Every link on the shelf is reviewed by a human, tagged, and dropped into a collection. Skim, save, and share the ones that fit your work.',
      primaryCta: { label: 'Browse the finds', href: '/sbm' },
      secondaryCta: { label: 'Submit a link', href: '/contact' },
      searchPlaceholder: 'Search collections, links, or curators',
      focusLabel: 'On the shelf',
      featureCardBadge: 'Fresh this week',
      featureCardTitle: 'Handpicked resources land here every day.',
      featureCardDescription: 'A rolling shelf of the most useful links our curators have saved, cleaned up, and made easy to find.',
    },
    intro: {
      badge: 'How the shelf works',
      title: 'A calmer way to bookmark, browse, and share the useful stuff.',
      paragraphs: [
        'Each link is reviewed by a human before it lands on the shelf. Nothing is auto-scraped, nothing is spun.',
        'Everything gets grouped into a collection — tools, reads, playbooks — so you can walk the shelves the way you would a good bookstore.',
        'Save what fits your work, ignore what doesn’t. The rest quietly waits.',
      ],
      sideBadge: 'On the shelf',
      sidePoints: [
        'Every link vetted by a real curator.',
        'Organised into thematic collections.',
        'One-click save, share, and revisit.',
        'A calm feed — no infinite scroll traps.',
      ],
      primaryLink: { label: 'Browse the finds', href: '/sbm' },
      secondaryLink: { label: 'Submit a link', href: '/contact' },
    },
    cta: {
      badge: 'Add to the shelf',
      title: 'Have a link worth sharing?',
      description: 'Send it in — if it belongs on the shelf, we’ll clean it up, tag it, and drop it into the right collection.',
      primaryCta: { label: 'Submit a link', href: '/contact' },
      secondaryCta: { label: 'Browse the finds', href: '/sbm' },
    },
    taskSection: {
      heading: 'Fresh on the shelf',
      descriptionSuffix: 'The newest links our curators just saved.',
    },
    features: [
      {
        eyebrow: 'Every link vetted',
        title: 'Nothing lands here on autopilot.',
        body: 'A real curator reads the piece, checks the source, and writes the one-line why-you-should-open-it before it makes the shelf.',
        cta: { label: 'See recent finds', href: '/sbm' },
        bullets: ['Human review on every link', 'One-line "why open it" summary', 'Broken links pruned weekly'],
      },
      {
        eyebrow: 'Organised into collections',
        title: 'Walk the shelves the way you browse a good bookstore.',
        body: 'Design tools sit next to design reads. Playbooks live near case studies. Everything is grouped so you can graze one shelf and go deep.',
        cta: { label: 'Browse collections', href: '/sbm' },
        bullets: ['Curator-owned collections', 'Cross-tagged for lateral finds', 'No infinite-scroll rabbit holes'],
      },
      {
        eyebrow: 'Save & share your finds',
        title: 'Keep the good ones, pass them on.',
        body: 'Save a link to revisit later, or copy a clean share URL that carries the collection context with it.',
        cta: { label: 'Create an account', href: '/signup' },
        bullets: ['One-click save', 'Shareable collection links', 'Personal shelf per curator'],
      },
    ],
    faq: [
      {
        q: 'What actually goes on the shelf?',
        a: 'Anything a human curator finds genuinely useful — tools, essays, playbooks, case studies, reference pages. If it saves someone an afternoon, it belongs.',
      },
      {
        q: 'How is this different from a link aggregator?',
        a: 'No voting, no algorithm, no autoposting. Each link is chosen and written up by a person before it lands.',
      },
      {
        q: 'Can I submit a link?',
        a: 'Yes — the submit form takes a URL and a one-line note. If it fits a collection, it gets cleaned up and shelved.',
      },
      {
        q: 'Do you track what I open?',
        a: 'The shelf works without an account. Sign up only when you want a personal save list.',
      },
      {
        q: 'How often does new stuff land?',
        a: 'Small drops most days, larger batches at the top of each week. Follow the “fresh this week” shelf for the newest.',
      },
    ],
    quotes: [
      { name: 'A design curator', quote: 'The only bookmark site I actually reopen. Everything on the shelf is worth the click.' },
      { name: 'A contributor', quote: 'Submitting here feels like handing a book to a librarian who cares. That’s rare online.' },
      { name: 'A weekly reader', quote: 'I graze one collection and walk away with three genuinely useful things. No noise, no fluff.' },
    ],
  },
  about: {
    badge: 'About the shelf',
    title: 'A quiet home for handpicked links.',
    description: `${slot4BrandConfig.siteName} is a curated bookmark shelf. Every link is reviewed by a person, tagged, and shelved into a collection so discovery stays calm.`,
    paragraphs: [
      'We started this because the good links kept getting buried. Aggregators surface volume; algorithms surface heat. Neither surfaces the piece a friend would actually send you.',
      'Every link on the shelf goes through a real curator: read it, verify the source, write the one-line "why open it", drop it into the right collection.',
      'The result is small on purpose. The shelf grows a few links a day, not a few thousand.',
    ],
    values: [
      {
        title: 'Human curation, always',
        description: 'No scraping, no auto-posting. A person reads the piece before it lands.',
      },
      {
        title: 'Calm, browseable collections',
        description: 'Related links sit together. Walk the shelves — no infinite scroll.',
      },
      {
        title: 'Useful over trending',
        description: 'We save the piece that saves someone an afternoon, not the one chasing the moment.',
      },
    ],
  },
  contact: {
    eyebrow: `Send it in`,
    title: 'Got a link worth shelving?',
    description: 'Share a URL, a short note on why it belongs, and which shelf it fits. If it makes the cut, a curator will clean it up and drop it into the right collection.',
    formTitle: 'Submit a link',
  },

  search: {
    metadata: {
      title: 'Search the shelf',
      description: 'Search across every link, collection, and curator note on the shelf.',
    },
    hero: {
      badge: 'Search the shelf',
      title: 'Find the link you half-remember.',
      description: 'Search by keyword, collection, or curator note across the full shelf.',
      placeholder: 'Search links, collections, or curators',
    },
    resultsTitle: 'From across the shelf',
  },
  create: {
    metadata: {
      title: 'Add a find',
      description: 'Add a new link to your personal shelf.',
    },
    locked: {
      badge: 'Curator access',
      title: 'Log in to add a find.',
      description: 'Your account gives you a personal shelf plus the ability to submit links for the main collection.',
    },
    hero: {
      badge: 'Add to the shelf',
      title: 'Drop a link onto your shelf.',
      description: 'Paste the URL, note why it matters, and tag it with a collection. It lands on your personal shelf first — submit it upstream if it deserves the main shelf.',
    },
    formTitle: 'The find',
    submitLabel: 'Save to my shelf',
    successTitle: 'Saved to your shelf.',
  },
  auth: {
    login: {
      metadataDescription: 'Log in to your curator shelf.',
      badge: 'Curator access',
      title: 'Welcome back to your shelf.',
      description: 'Log in to revisit your saved finds and drop new links onto your personal shelf.',
      formTitle: 'Log in',
      submitLabel: 'Continue',
      noAccount: 'No shelf matched those details. Create one first, then log in.',
      success: 'Logged in. Redirecting…',
      createCta: 'Start a shelf',
    },
    signup: {
      metadataDescription: 'Start your own curator shelf.',
      badge: 'Start a shelf',
      title: 'Start your own curator shelf.',
      description: 'Every account gets a personal shelf for the links you want to keep, plus the ability to submit finds upstream.',
      formTitle: 'Create your shelf',
      submitLabel: 'Create shelf',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Shelf created. Redirecting…',
      loginCta: 'Log in instead',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'From the same shelf',
      fallbackTitle: 'Post details',
    },
    listing: {
      relatedTitle: 'Nearby on the shelf',
      fallbackTitle: 'Details',
    },
    image: {
      relatedTitle: 'From the same shelf',
      fallbackTitle: 'Details',
    },
    profile: {
      relatedTitle: 'Their finds',
      fallbackDescription: 'Curator details will appear here once available.',
      visitButton: 'Visit resource',
    },
  },
} as const
