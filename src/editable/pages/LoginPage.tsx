import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Log in', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-panel-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] w-full max-w-[77.5rem] items-center gap-12 px-6 py-16 md:px-8 lg:grid-cols-[1fr_0.9fr] lg:px-12">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">
              {pagesContent.auth.login.badge}
            </p>
            <h1 className="editable-display mt-4 max-w-xl text-[2.5rem] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[3.25rem]">
              {pagesContent.auth.login.title}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-[var(--slot4-muted-text)]">
              {pagesContent.auth.login.description}
            </p>
          </div>
          <div className="rounded-3xl border border-[var(--editable-border)] bg-white p-8 shadow-[0_20px_60px_rgba(0,30,44,0.06)]">
            <h2 className="editable-display text-2xl font-bold tracking-[-0.02em]">
              {pagesContent.auth.login.formTitle}
            </h2>
            <EditableLocalLoginForm />
            <p className="mt-6 text-sm text-[var(--slot4-muted-text)]">
              New here?{' '}
              <Link href="/signup" className="font-semibold text-[var(--slot4-accent)] underline-offset-4 hover:underline">
                {pagesContent.auth.login.createCta}
              </Link>
            </p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
