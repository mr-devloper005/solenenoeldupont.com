import type { CSSProperties } from 'react'
import type { TaskKey } from '@/lib/site-config'

/*
  vaboulus-inspired token surface. Each task shares the same clean palette;
  sbm carries the warm-orange accent, other tasks quietly reuse the navy.
*/

export type TaskTheme = {
  kicker: string
  note: string
  dark: boolean
  fontDisplay: string
  fontBody: string
  bg: string
  surface: string
  raised: string
  text: string
  muted: string
  line: string
  accent: string
  accentSoft: string
  onAccent: string
  glow: string
  radius: string
}

const DISPLAY_FONT = "'Plus Jakarta Sans', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"
const BODY_FONT = "'DM Sans', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"

const base = {
  dark: false,
  fontDisplay: DISPLAY_FONT,
  fontBody: BODY_FONT,
  bg: '#ffffff',
  surface: '#ffffff',
  raised: '#fafafa',
  text: '#001e2c',
  muted: '#535353',
  line: 'rgba(14,14,14,0.10)',
  accent: '#001e2c',
  accentSoft: '#e6eff3',
  onAccent: '#ffffff',
  glow: 'rgba(252,103,54,0.10)',
  radius: '1rem',
} satisfies Omit<TaskTheme, 'kicker' | 'note'>

const warmAccent = {
  ...base,
  accent: '#fc6736',
  accentSoft: '#fff1eb',
  glow: 'rgba(252,103,54,0.12)',
}

export const taskThemes: Record<TaskKey, TaskTheme> = {
  article: { ...base, kicker: 'Reads', note: 'Long-form pieces worth your attention.' },
  listing: { ...base, kicker: 'Directory', note: 'Places and services worth a look.' },
  classified: { ...base, kicker: 'Board', note: 'Fresh offers and time-sensitive posts.' },
  image: { ...base, kicker: 'Visuals', note: 'A visual feed of standout imagery.' },
  sbm: { ...warmAccent, kicker: 'Finds · Curators', note: 'Handpicked links and resources worth saving.' },
  pdf: { ...base, kicker: 'Documents', note: 'Reference material and downloads.' },
  profile: { ...base, kicker: 'People', note: 'Curators and contributors.' },
}

export function getTaskTheme(task: TaskKey): TaskTheme {
  return taskThemes[task] || taskThemes.sbm
}

export function taskThemeStyle(task: TaskKey): CSSProperties {
  const t = getTaskTheme(task)
  return {
    '--tk-bg': t.bg,
    '--tk-surface': t.surface,
    '--tk-raised': t.raised,
    '--tk-text': t.text,
    '--tk-muted': t.muted,
    '--tk-line': t.line,
    '--tk-accent': t.accent,
    '--tk-accent-soft': t.accentSoft,
    '--tk-on-accent': t.onAccent,
    '--tk-glow': t.glow,
    '--tk-radius': t.radius,
    '--slot4-accent': t.accent,
    '--slot4-accent-fill': t.accent,
    '--editable-font-display': t.fontDisplay,
    '--editable-font-body': t.fontBody,
    fontFamily: t.fontBody,
  } as CSSProperties
}
