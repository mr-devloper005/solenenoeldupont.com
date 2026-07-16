'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Globe, Layers, Sparkles, Users } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { collectionShortcuts } from '@/editable/content/global.content'
import { getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'
import { EditableReveal } from '@/editable/shell/EditableReveal'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function categoryOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Collection'
}

function domainOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const url = (typeof content.website === 'string' && content.website) || (typeof content.url === 'string' && content.url) || ''
  try {
    if (url) return new URL(url).hostname.replace(/^www\./, '')
  } catch {}
  return ''
}

const container = 'mx-auto w-full max-w-[77.5rem] px-6 md:px-8 lg:px-12'

/* ─────────────────────────────── Hero ─────────────────────────────── */

export function EditableHomeHero({ primaryRoute, posts }: HomeSectionProps) {
  const hero = pagesContent.home.hero
  const heroTitle = hero.title.join(' ')
  const stack = posts.slice(0, 3)

  return (
    <section className="relative overflow-hidden bg-white">
      <div className={`${container} pt-16 pb-16 md:pt-20 md:pb-20 lg:pt-24 lg:pb-24`}>
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <EditableReveal index={0}>
            <p className={dc.type.eyebrow}>{hero.badge}</p>
            <h1 className={`mt-5 text-balance ${dc.type.heroTitle}`}>{heroTitle}</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--slot4-muted-text)]">{hero.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href={primaryRoute || hero.primaryCta.href} className={dc.button.primary}>
                {hero.primaryCta.label} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={hero.secondaryCta.href} className={dc.button.secondary}>
                {hero.secondaryCta.label}
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-2">
                {['#fc6736', '#001e2c', '#7c7c7c', '#e6eff3'].map((c, i) => (
                  <span key={i} className="h-9 w-9 rounded-full border-2 border-white" style={{ backgroundColor: c }} />
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--slot4-page-text)]">Trusted by curators worldwide</p>
                <p className="text-xs text-[var(--slot4-muted-text)]">Fresh finds land daily on the shelf.</p>
              </div>
            </div>
          </EditableReveal>

          <EditableReveal index={1} className="relative">
            <div className="relative mx-auto h-[440px] w-full max-w-md sm:h-[500px]">
              <div className="absolute inset-0 rounded-[2rem] bg-[var(--slot4-sky)]" />
              <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(70%_70%_at_30%_20%,var(--slot4-accent-soft),transparent_70%)]" />
              {stack.length ? (
                stack.map((post, i) => {
                  const rotations = ['-rotate-6', 'rotate-3', '-rotate-2']
                  const offsets = ['left-6 top-6', 'right-8 top-24', 'left-10 bottom-8']
                  return (
                    <div
                      key={post.id || post.slug || i}
                      className={`absolute w-56 overflow-hidden rounded-xl border border-[var(--editable-border)] bg-white shadow-[0_20px_60px_rgba(0,30,44,0.14)] ${offsets[i]} ${rotations[i]}`}
                    >
                      <div className="aspect-[3/2] overflow-hidden bg-[var(--slot4-media-bg)]">
                        <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover" loading="lazy" />
                      </div>
                      <div className="p-3">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--slot4-accent)]">{categoryOf(post)}</p>
                        <p className="mt-1.5 line-clamp-2 text-sm font-semibold leading-snug text-[var(--slot4-page-text)]">{post.title}</p>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="h-12 w-12 text-[var(--slot4-accent)]" />
                </div>
              )}
            </div>
          </EditableReveal>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── Collections marquee ─────────────────────────── */

export function EditableStoryRail({ posts }: HomeSectionProps) {
  const derived = Array.from(new Set(posts.map(categoryOf).filter(Boolean))) as string[]
  const items = [...collectionShortcuts.map((c) => c.name), ...derived].slice(0, 16)
  if (!items.length) return null
  const marquee = [...items, ...items]

  return (
    <EditableReveal index={2} as="section">
      <div className="border-y border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] py-6 overflow-hidden">
        <div className="editable-marquee-track flex gap-4 whitespace-nowrap">
          {marquee.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white px-4 py-2 text-sm font-medium text-[var(--slot4-page-text)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--slot4-accent)]" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </EditableReveal>
  )
}

/* ────────────────── Alternating feature rows (magazine split) ────────────────── */

export function EditableMagazineSplit({ posts }: HomeSectionProps) {
  const features = pagesContent.home.features
  const pics = posts.map(getEditablePostImage).filter(Boolean).slice(0, features.length)

  return (
    <section className="bg-white">
      <div className={`${container} py-20 md:py-24 lg:py-28 space-y-24`}>
        {features.map((feature, i) => (
          <EditableReveal key={feature.eyebrow} index={i + 3}>
            <div
              className={`grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center ${
                i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <div>
                <p className={dc.type.eyebrow}>{feature.eyebrow}</p>
                <h2 className={`mt-4 ${dc.type.sectionTitle}`}>{feature.title}</h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-[var(--slot4-muted-text)]">{feature.body}</p>
                <ul className="mt-6 space-y-3">
                  {feature.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="text-sm leading-6 text-[var(--slot4-page-text)]">{b}</span>
                    </li>
                  ))}
                </ul>
                <Link href={feature.cta.href} className={`mt-8 ${dc.button.secondary}`}>
                  {feature.cta.label} <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)]">
                  {pics[i] ? (
                    <img src={pics[i]} alt="" className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Sparkles className="h-14 w-14 text-[var(--slot4-accent)]" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </EditableReveal>
        ))}
      </div>
    </section>
  )
}

/* ─────────────── Collections grid + featured find + stats + posts grid + quotes + FAQ ─────────────── */

function CollectionsGrid({ posts }: { posts: SitePost[] }) {
  // Real category counts from posts, fallback to shortcuts.
  const counts = new Map<string, number>()
  posts.forEach((p) => {
    const c = categoryOf(p)
    if (!c) return
    counts.set(c, (counts.get(c) || 0) + 1)
  })
  const derived = Array.from(counts.entries())
    .map(([name, count]) => ({ name, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), count }))
    .filter((it) => it.name && it.name.toLowerCase() !== 'collection')
  const fallback = collectionShortcuts.map((it) => ({ ...it, count: 0 }))
  const items = (derived.length ? derived : fallback).slice(0, 6)

  return (
    <EditableReveal index={6} as="section">
      <div className={`${container} py-20 md:py-24`}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className={dc.type.eyebrow}>Collections</p>
            <h2 className={`mt-4 ${dc.type.sectionTitle}`}>Walk the shelves.</h2>
          </div>
          <Link href="/sbm" className={dc.button.secondary}>
            Browse all <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/sbm?category=${item.slug}`}
              className="group flex flex-col rounded-2xl border border-[var(--editable-border)] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[var(--slot4-page-text)]/40"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
                <Layers className="h-5 w-5" />
              </span>
              <h3 className="editable-display mt-5 text-xl font-bold tracking-[-0.02em]">{item.name}</h3>
              <p className="mt-2 text-sm text-[var(--slot4-muted-text)]">
                {item.count ? `${item.count} ${item.count === 1 ? 'Find' : 'finds'} on the shelf` : 'A quiet, growing shelf'}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--slot4-accent)]">
                Open collection <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </EditableReveal>
  )
}

function FeaturedAndStats({ posts, primaryRoute, primaryTask }: HomeSectionProps) {
  const featured = posts[0]
  const collectionsCount = new Set(posts.map(categoryOf).filter(Boolean)).size || collectionShortcuts.length
  const stats = [
    { label: 'Curated finds', value: posts.length ? String(posts.length * 27) : '2,400+' },
    { label: 'Collections', value: String(collectionsCount) },
    { label: 'This week', value: String(Math.max(6, Math.floor(posts.length / 2))) },
    { label: 'Curators', value: '48' },
  ]

  return (
    <EditableReveal index={7} as="section">
      <div className="bg-[var(--slot4-panel-bg)]">
        <div className={`${container} py-20 md:py-24`}>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
            {featured ? (
              <Link
                href={postHref(primaryTask, featured, primaryRoute)}
                className="group relative flex min-h-[380px] flex-col justify-end overflow-hidden rounded-3xl bg-[var(--slot4-dark-bg)] p-8 text-white transition duration-300 hover:-translate-y-1 sm:p-10"
              >
                <img
                  src={getEditablePostImage(featured)}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-40 transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,30,44,0.1),rgba(0,30,44,0.9))]" />
                <div className="relative z-10">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Featured find</p>
                  <h3 className="editable-display mt-4 text-3xl font-bold leading-tight tracking-[-0.02em] sm:text-4xl">
                    {featured.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-sm leading-7 text-white/80">{getEditableExcerpt(featured, 160)}</p>
                  <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[var(--slot4-page-text)]">
                    Open find <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ) : (
              <div className="rounded-3xl bg-[var(--slot4-dark-bg)] p-10 text-white">
                <h3 className="editable-display text-3xl font-bold">A featured find will land here soon.</h3>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col justify-between rounded-2xl border border-[var(--editable-border)] bg-white p-6">
                  <span className="editable-display text-4xl font-bold tracking-[-0.03em] text-[var(--slot4-page-text)]">{s.value}</span>
                  <span className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--slot4-muted-text)]">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </EditableReveal>
  )
}

function DynamicGrid({ posts, primaryRoute, primaryTask }: HomeSectionProps) {
  const items = posts.slice(0, 8)
  if (!items.length) return null
  return (
    <EditableReveal index={8} as="section">
      <div className={`${container} py-20 md:py-24`}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className={dc.type.eyebrow}>{pagesContent.home.taskSection.heading}</p>
            <h2 className={`mt-4 ${dc.type.sectionTitle}`}>Latest on the shelf.</h2>
          </div>
          <Link href={primaryRoute} className={dc.button.secondary}>
            Browse all finds <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((post) => {
            const domain = domainOf(post)
            const category = categoryOf(post)
            return (
              <Link
                key={post.id || post.slug}
                href={postHref(primaryTask, post, primaryRoute)}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-white transition duration-300 hover:-translate-y-1 hover:border-[var(--slot4-page-text)]/40"
              >
                <div className="relative aspect-[3/2] overflow-hidden bg-[var(--slot4-media-bg)]">
                  <img
                    src={getEditablePostImage(post)}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]">
                    {domain ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--slot4-panel-bg)] px-2.5 py-1 text-[var(--slot4-muted-text)]">
                        <Globe className="h-3 w-3" /> {domain}
                      </span>
                    ) : null}
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--slot4-panel-bg)] px-2.5 py-1 text-[var(--slot4-accent)]">
                      {category}
                    </span>
                  </div>
                  <h3 className="editable-display line-clamp-2 text-base font-bold leading-snug tracking-[-0.02em] text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">
                    {post.title}
                  </h3>
                  <p className="line-clamp-1 text-sm text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 90)}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </EditableReveal>
  )
}

function QuotesBand() {
  const quotes = pagesContent.home.quotes
  return (
    <EditableReveal index={9} as="section">
      <div className="bg-[var(--slot4-panel-bg)]">
        <div className={`${container} py-20 md:py-24`}>
          <div className="max-w-2xl">
            <p className={dc.type.eyebrow}>What curators say</p>
            <h2 className={`mt-4 ${dc.type.sectionTitle}`}>A quieter place to bookmark.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {quotes.map((q, i) => (
              <div key={i} className="flex h-full flex-col rounded-2xl border border-[var(--editable-border)] bg-white p-7">
                <span className="editable-display text-5xl leading-none text-[var(--slot4-accent)]">“</span>
                <p className="mt-4 flex-1 text-base leading-7 text-[var(--slot4-page-text)]">{q.quote}</p>
                <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-[var(--slot4-muted-text)]">
                  <Users className="h-4 w-4 text-[var(--slot4-accent)]" /> {q.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </EditableReveal>
  )
}

function FaqAccordion() {
  const faqs = pagesContent.home.faq
  const [open, setOpen] = useState<number | null>(0)
  return (
    <EditableReveal index={10} as="section">
      <div className={`${container} py-20 md:py-24`}>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className={dc.type.eyebrow}>FAQ</p>
            <h2 className={`mt-4 ${dc.type.sectionTitle}`}>Questions, calmly answered.</h2>
            <p className="mt-5 max-w-md text-base leading-7 text-[var(--slot4-muted-text)]">
              Everything about how the shelf works, who curates, and how to submit a find.
            </p>
          </div>
          <div className="divide-y divide-[var(--editable-border)] rounded-2xl border border-[var(--editable-border)] bg-white">
            {faqs.map((item, i) => {
              const isOpen = open === i
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="editable-display text-base font-semibold text-[var(--slot4-page-text)] sm:text-lg">{item.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[var(--slot4-muted-text)] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen ? (
                    <div className="px-6 pb-6 text-sm leading-7 text-[var(--slot4-muted-text)]">{item.a}</div>
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </EditableReveal>
  )
}

/*
  EditableTimeCollections keeps its name but now bundles the "shelf" mid-page:
  collections grid → featured+stats → dynamic bookmarks grid → quotes → FAQ.
*/
export function EditableTimeCollections(props: HomeSectionProps) {
  return (
    <>
      <CollectionsGrid posts={props.posts} />
      <FeaturedAndStats {...props} />
      <DynamicGrid {...props} />
      <QuotesBand />
      <FaqAccordion />
    </>
  )
}

/* ─────────────────────────────── Dark CTA band ─────────────────────────────── */

export function EditableHomeCta() {
  const cta = pagesContent.home.cta
  return (
    <EditableReveal index={11} as="section">
      <div className="bg-[var(--slot4-dark-bg)] text-white">
        <div className={`${container} py-20 md:py-24 lg:py-28`}>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{cta.badge}</p>
              <h2 className="editable-display mt-4 text-[2.25rem] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[3rem] lg:text-[3.5rem]">
                Discover today’s finds.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-white/70">{cta.description}</p>
            </div>
            <div className="flex flex-wrap justify-start gap-3 lg:justify-end">
              <Link
                href={cta.primaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--slot4-accent)] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:brightness-105"
              >
                {cta.primaryCta.label} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={cta.secondaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 bg-transparent px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
              >
                {cta.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </EditableReveal>
  )
}
