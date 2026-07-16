'use client'

import { Bookmark, Layers, Mail, Sparkles } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const lanes = [
  { icon: Bookmark, title: 'Submit a link', body: 'Send a URL you think belongs on the shelf. If it fits a collection, a curator will clean it up and drop it in.' },
  { icon: Layers, title: 'Collection ideas', body: 'Missing a shelf? Suggest a collection — the good ones make it in.' },
  { icon: Sparkles, title: 'Curator applications', body: 'Want to run a shelf? Tell us what you’d curate and why.' },
  { icon: Mail, title: 'Everything else', body: 'Feedback, partnerships, or a broken link report — one form, we route it.' },
]

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white">
        <section className="mx-auto grid w-full max-w-[77.5rem] gap-12 px-6 py-16 md:px-8 md:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:px-12">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">
              {pagesContent.contact.eyebrow}
            </p>
            <h1 className="editable-display mt-4 text-[2.75rem] font-bold leading-[1.02] tracking-[-0.04em] sm:text-[3.5rem]">
              {pagesContent.contact.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--slot4-muted-text)]">
              {pagesContent.contact.description}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {lanes.map((lane) => (
                <div key={lane.title} className="rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-5">
                  <lane.icon className="h-5 w-5 text-[var(--slot4-accent)]" />
                  <h2 className="editable-display mt-3 text-lg font-bold tracking-[-0.02em]">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-[var(--slot4-muted-text)]">{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--editable-border)] bg-white p-7 shadow-[0_20px_60px_rgba(0,30,44,0.06)]">
            <h2 className="editable-display text-2xl font-bold tracking-[-0.02em]">{pagesContent.contact.formTitle}</h2>
            <EditableContactLeadForm />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
