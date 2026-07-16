import type { TaskKey } from '@/lib/site-config'

export type TaskPageVoice = {
  eyebrow: string
  headline: string
  description: string
  filterLabel: string
  secondaryNote: string
  chips: string[]
}

export const taskPageVoices = {
  article: {
    eyebrow: 'Reads',
    headline: 'Long-form pieces worth your attention.',
    description: 'Essays, guides, and story-led writeups pulled together into a calm reading shelf.',
    filterLabel: 'Filter topic',
    secondaryNote: 'Room to read, no infinite scroll traps.',
    chips: ['Long-reads', 'Essays', 'Guides'],
  },
  classified: {
    eyebrow: 'Board',
    headline: 'Fresh offers and time-sensitive notes.',
    description: 'Short posts you can act on quickly — no editorial decoration.',
    filterLabel: 'Filter category',
    secondaryNote: 'Fast to scan, easy to act on.',
    chips: ['Fast scan', 'Offers', 'Action cues'],
  },
  sbm: {
    eyebrow: 'Finds · Curators',
    headline: 'Handpicked links, shelved into collections.',
    description: 'Every find is reviewed by a real curator, tagged, and shelved so you can walk the collections instead of scrolling forever.',
    filterLabel: 'Choose a collection',
    secondaryNote: 'Curated resources, calm metadata, always browseable.',
    chips: ['Curated collections', 'Human-reviewed', 'Updated daily'],
  },
  profile: {
    eyebrow: 'Curators',
    headline: 'The people behind the shelves.',
    description: 'Curator identity, trust cues, and the shelves they run.',
    filterLabel: 'Filter category',
    secondaryNote: 'Make the curator visible before the grid begins.',
    chips: ['Identity first', 'Trust cues', 'Curator shelves'],
  },
  pdf: {
    eyebrow: 'Documents',
    headline: 'Reference material and downloads.',
    description: 'Guides, decks, and reports worth keeping locally.',
    filterLabel: 'Filter type',
    secondaryNote: 'Archive-ready reference material.',
    chips: ['Documents', 'Guides', 'Reference'],
  },
  listing: {
    eyebrow: 'Directory',
    headline: 'Places and services worth a look.',
    description: 'A quiet directory of things worth booking, buying, or visiting.',
    filterLabel: 'Filter category',
    secondaryNote: 'Prioritize the useful over the loud.',
    chips: ['Directory', 'Compare', 'Discovery'],
  },
  image: {
    eyebrow: 'Visuals',
    headline: 'A gallery-first shelf of visual finds.',
    description: 'Image-led posts, gallery pages, and visual references.',
    filterLabel: 'Filter category',
    secondaryNote: 'Let the images carry the shelf.',
    chips: ['Gallery', 'Visual-first', 'Portfolio mood'],
  },
} satisfies Record<TaskKey, TaskPageVoice>
