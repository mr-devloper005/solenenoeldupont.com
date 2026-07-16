import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Start a shelf', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-panel-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] w-full max-w-[77.5rem] items-center gap-12 px-6 py-16 md:px-8 lg:grid-cols-[0.9fr_1fr] lg:px-12">
          <div className="rounded-3xl border border-[var(--editable-border)] bg-white p-8 shadow-[0_20px_60px_rgba(0,30,44,0.06)]">
            <h1 className="editable-display text-2xl font-bold tracking-[-0.02em]">
              {pagesContent.auth.signup.formTitle}
            </h1>
            <EditableLocalSignupForm />
            <p className="mt-6 text-sm text-[var(--slot4-muted-text)]">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-[var(--slot4-accent)] underline-offset-4 hover:underline">
                {pagesContent.auth.signup.loginCta}
              </Link>
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">
              {pagesContent.auth.signup.badge}
            </p>
            <h2 className="editable-display mt-4 max-w-xl text-[2.5rem] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[3.25rem]">
              {pagesContent.auth.signup.title}
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-[var(--slot4-muted-text)]">
              {pagesContent.auth.signup.description}
            </p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
