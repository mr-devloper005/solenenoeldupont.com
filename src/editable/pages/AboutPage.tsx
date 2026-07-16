import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-white">
        <section className="mx-auto grid w-full max-w-[77.5rem] gap-12 px-6 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-8 md:py-20 lg:px-12">
          <article>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">
              {pagesContent.about.badge}
            </p>
            <h1 className="editable-display mt-5 text-[2.75rem] font-bold leading-[1.02] tracking-[-0.04em] sm:text-[3.5rem] lg:text-[4rem]">
              About {SITE_CONFIG.name}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--slot4-muted-text)]">
              {pagesContent.about.description}
            </p>
            <div className="mt-8 space-y-5 text-base leading-8 text-[var(--slot4-muted-text)]">
              {pagesContent.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
          <aside className="space-y-4">
            {pagesContent.about.values.map((value) => (
              <div key={value.title} className="rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-6">
                <h2 className="editable-display text-xl font-bold tracking-[-0.02em]">{value.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
              </div>
            ))}
          </aside>
        </section>
      </main>
    </EditableSiteShell>
  )
}
