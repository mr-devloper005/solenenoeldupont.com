'use client'

import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const FOOTER_CATEGORIES = CATEGORY_OPTIONS.slice(0, 12)

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="border-t border-[var(--editable-border)] bg-white text-[var(--slot4-page-text)]">
      <div className="mx-auto grid max-w-[77.5rem] gap-12 px-6 py-16 sm:grid-cols-2 md:px-8 lg:grid-cols-[1.4fr_1.6fr_1fr_1fr] lg:px-12">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-[var(--slot4-dark-bg)]">
              <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-6 w-6 object-contain" />
            </span>
            <span className="editable-display text-lg font-bold tracking-[-0.02em]">{SITE_CONFIG.name}</span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-[var(--slot4-muted-text)]">
            {globalContent.footer.description}
          </p>
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">
            {globalContent.footer.tagline}
          </p>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-muted-text)]">Collections</h3>
          <div className="mt-5 flex flex-wrap gap-2">
            {FOOTER_CATEGORIES.map((item) => (
              <Link
                key={item.slug}
                href={`/sbm?category=${item.slug}`}
                className="inline-flex items-center rounded-full border border-[var(--editable-border)] bg-white px-3.5 py-1.5 text-xs font-semibold text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)] hover:bg-[var(--slot4-accent-soft)] hover:text-[var(--slot4-accent)]"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-muted-text)]">Site</h3>
          <div className="mt-5 grid gap-2.5">
            <Link href="/about" className="text-sm font-medium text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-accent)]">About</Link>
            <Link href="/contact" className="text-sm font-medium text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-accent)]">Contact</Link>
            <Link href="/search" className="text-sm font-medium text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-accent)]">Search</Link>
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-muted-text)]">Account</h3>
          <div className="mt-5 grid gap-2.5">
            {session ? (
              <>
                <Link href="/create" className="text-sm font-medium text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-accent)]">Add a find</Link>
                <button
                  type="button"
                  onClick={logout}
                  className="text-left text-sm font-medium text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-accent)]"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-accent)]">Log in</Link>
                <Link href="/signup" className="text-sm font-medium text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-accent)]">Start a shelf</Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--editable-border)] px-6 py-6 text-center text-xs font-medium text-[var(--slot4-muted-text)]">
        © {year} {SITE_CONFIG.name}. {globalContent.footer.bottomNote}
      </div>
    </footer>
  )
}
