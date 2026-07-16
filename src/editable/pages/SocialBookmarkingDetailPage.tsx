import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight, CheckCircle2, ExternalLink, Eye, Globe, Layers, ShieldCheck, Sparkles } from 'lucide-react'
import { buildPostMetadata, buildTaskMetadata } from '@/lib/seo'
import { fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableReveal } from '@/editable/shell/EditableReveal'
import { taskThemeStyle } from '@/editable/theme/task-themes'
import { Ads, getSlotSizes } from '@/lib/ads'

export const revalidate = 3

const pickRandom = (sizes: string[]) => sizes[Math.floor(Math.random() * sizes.length)]

const getContent = (post: SitePost) =>
  post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
const asText = (value: unknown) => (typeof value === 'string' ? value.trim() : '')
const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const v = asText(content[key])
    if (v) return v
  }
  return ''
}
const getBody = (post: SitePost) => {
  const c = getContent(post)
  return asText(c.body) || asText(c.description) || asText(c.details) || post.summary || 'Notes on this find will appear here soon.'
}
const cleanDomain = (value: string) => {
  try {
    return new URL(value).hostname.replace(/^www\./, '')
  } catch {
    return value.replace(/^https?:\/\//, '').replace(/\/$/, '')
  }
}
const stableHash = (v: string) => {
  let h = 0
  for (let i = 0; i < v.length; i += 1) h = (h * 31 + v.charCodeAt(i)) >>> 0
  return h
}

const escapeHtml = (v: string) => v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
const safeUrl = (v: string) => (/^https?:\/\//i.test(v) ? v : '#')
const linkifyText = (v: string) =>
  v
    .replace(/\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/gi, (_m, l, u) => `<a href="${safeUrl(u)}" target="_blank" rel="nofollow noopener noreferrer">${l}</a>`)
    .replace(/(^|[\s(>])((https?:\/\/)[^\s<)]+)/gi, (_m, p, u) => `${p}<a href="${safeUrl(u)}" target="_blank" rel="nofollow noopener noreferrer">${u}</a>`)
const formatPlainText = (raw: string) => {
  const v = raw.trim()
  if (!v) return ''
  if (/<[a-z][\s\S]*>/i.test(v)) {
    return v
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/\s+on\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  }
  return v
    .split(/\n{2,}/)
    .map((p) => `<p>${linkifyText(escapeHtml(p).replace(/\n/g, '<br />'))}</p>`)
    .join('')
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolved = await params
  const post = await fetchTaskPostBySlug('sbm', resolved.slug)
  return post ? await buildPostMetadata('sbm', post) : await buildTaskMetadata('sbm')
}

export default async function SocialBookmarkingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolved = await params
  const post = await fetchTaskPostBySlug('sbm', resolved.slug)
  if (!post) notFound()
  const related = (await fetchTaskPosts('sbm', 9)).filter((item) => item.slug !== post.slug).slice(0, 6)
  return <SocialBookmarkingDetailView post={post} related={related} />
}

export function SocialBookmarkingDetailView({ post, related }: { post: SitePost; related: SitePost[] }) {
  const taskConfig = getTaskConfig('sbm')
  const url = getField(post, ['website', 'url', 'link'])
  const domain = url ? cleanDomain(url) : ''
  const collection = getField(post, ['category']) || post.tags?.[0] || 'General'
  const curator = getField(post, ['curator', 'author', 'submittedBy']) || SITE_CONFIG.name
  const tagList = (post.tags || []).slice(0, 8)
  const idNum = String((stableHash(post.slug || post.id || post.title || 'x') % 900) + 100)
  const container = 'mx-auto w-full max-w-[77.5rem] px-6 md:px-8 lg:px-12'
  const body = getBody(post)
  const wordCount = body.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length
  const readMin = Math.max(1, Math.round(wordCount / 220))

  return (
    <EditableSiteShell>
      <main style={taskThemeStyle('sbm')} className="min-h-screen bg-white text-[var(--tk-text)]">
        {/* HERO — full-bleed dark navy band with big display title, orange accent line, and CTA */}
        <section className="relative overflow-hidden bg-[#001e2c] text-white">
          <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #fc6736 0, transparent 45%), radial-gradient(circle at 80% 60%, #fc6736 0, transparent 45%)' }} />
          <div className={`${container} relative py-20 md:py-24 lg:py-28`}>
            <EditableReveal index={0}>
              <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
                <span className="tabular-nums text-[#fc6736]">№ {idNum}</span>
                <span className="h-px w-8 bg-white/20" />
                <span>{collection}</span>
                <span className="h-px w-8 bg-white/20" />
                <span className="inline-flex items-center gap-1.5 text-white/70"><ShieldCheck className="h-3.5 w-3.5 text-[#fc6736]" /> Verified find</span>
              </div>
            </EditableReveal>
            <EditableReveal index={1}>
              <h1 className="editable-display mt-8 max-w-5xl text-balance text-[2.5rem] font-bold leading-[1.02] tracking-[-0.04em] sm:text-[3.5rem] lg:text-[4.25rem]">
                {post.title}
              </h1>
            </EditableReveal>
            <EditableReveal index={2}>
              <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/70">
                  {domain ? (
                    <span className="inline-flex items-center gap-2"><Globe className="h-4 w-4 text-[#fc6736]" /> <span className="font-medium text-white">{domain}</span></span>
                  ) : null}
                  <span className="inline-flex items-center gap-2"><Eye className="h-4 w-4 text-[#fc6736]" /> {readMin} min read</span>
                  <span className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4 text-[#fc6736]" /> Curated by {curator}</span>
                </div>
                {url ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="group inline-flex items-center justify-center gap-2 self-start rounded-full bg-[#fc6736] px-7 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 sm:self-auto"
                  >
                    Visit resource
                    <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                ) : null}
              </div>
            </EditableReveal>
          </div>
        </section>

        {/* MAIN — asymmetric split: sticky resource module on left, long-form body on right */}
        <section className={`${container} py-16 md:py-20 lg:py-24`}>
          <div className="grid gap-14 lg:grid-cols-[320px_1fr] lg:items-start xl:grid-cols-[360px_1fr]">
            {/* LEFT — Resource module + trust + sidebar ad */}
            <EditableReveal index={0} className="lg:sticky lg:top-24 lg:self-start">
              <div className="space-y-6">
                <div className="overflow-hidden rounded-2xl border border-[#001e2c1a] bg-[#fafafa]">
                  <div className="flex items-center justify-between border-b border-[#001e2c1a] bg-white px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#535353]">
                    <span>The resource</span>
                    <span className="text-[#fc6736]">Live</span>
                  </div>
                  <div className="p-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#001e2c] text-white">
                      <Globe className="h-6 w-6" />
                    </div>
                    <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#fc6736]">{collection}</p>
                    <h2 className="editable-display mt-2 text-xl font-bold leading-snug tracking-[-0.02em] text-[#001e2c]">{post.title}</h2>
                    {domain ? <p className="mt-2 truncate text-sm text-[#535353]">{domain}</p> : null}
                    {url ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#001e2c] px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
                      >
                        Open the link <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : null}
                  </div>
                </div>

                <ul className="grid gap-4 rounded-2xl border border-[#001e2c1a] bg-white p-6">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#fc673699]/20 text-[#fc6736]"><CheckCircle2 className="h-4 w-4" /></span>
                    <div>
                      <p className="text-sm font-semibold text-[#001e2c]">Vetted source</p>
                      <p className="text-xs leading-5 text-[#535353]">Checked for signal before being shelved.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#fc673699]/20 text-[#fc6736]"><Layers className="h-4 w-4" /></span>
                    <div>
                      <p className="text-sm font-semibold text-[#001e2c]">Filed in {collection}</p>
                      <p className="text-xs leading-5 text-[#535353]">Grouped with related finds for easy discovery.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#fc673699]/20 text-[#fc6736]"><ShieldCheck className="h-4 w-4" /></span>
                    <div>
                      <p className="text-sm font-semibold text-[#001e2c]">Link health checked</p>
                      <p className="text-xs leading-5 text-[#535353]">Pruned weekly if the source goes dark.</p>
                    </div>
                  </li>
                </ul>

                <Ads slot="sidebar" size={pickRandom(getSlotSizes('sidebar'))} showLabel className="w-full" />
              </div>
            </EditableReveal>

            {/* RIGHT — long-form body */}
            <EditableReveal index={1}>
              <article className="min-w-0">
                <div className="flex items-center gap-4 border-l-2 border-[#fc6736] pl-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#001e2c]">The curator’s note</p>
                </div>
                <div
                  className="article-content mt-8 max-w-[68ch] text-[1.0625rem] leading-8 text-[#001e2c] [&_p:first-child::first-letter]:mr-2 [&_p:first-child::first-letter]:float-left [&_p:first-child::first-letter]:font-bold [&_p:first-child::first-letter]:leading-[0.9] [&_p:first-child::first-letter]:text-[3.5rem] [&_p:first-child::first-letter]:text-[#fc6736]"
                  dangerouslySetInnerHTML={{ __html: formatPlainText(body) }}
                />

                {tagList.length ? (
                  <div className="mt-14 border-t border-[#001e2c1a] pt-8">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#535353]">Also filed under</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {tagList.map((tag) => (
                        <Link
                          key={tag}
                          href={`/sbm?category=${encodeURIComponent(tag.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}`}
                          className="rounded-full border border-[#001e2c1a] bg-white px-4 py-2 text-xs font-medium text-[#001e2c] transition-colors hover:border-[#fc6736] hover:bg-[#fc673699]/15 hover:text-[#fc6736]"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}

                {url ? (
                  <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl border border-[#001e2c1a] bg-[#fafafa] p-8 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="editable-display text-xl font-bold tracking-[-0.02em] text-[#001e2c]">Ready to dive in?</p>
                      <p className="mt-1 text-sm text-[#535353]">Head to the source and see it for yourself.</p>
                    </div>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="inline-flex items-center gap-2 rounded-full bg-[#fc6736] px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      Visit resource <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                ) : null}
              </article>
            </EditableReveal>
          </div>
        </section>

        {/* RELATED — horizontal snap rail on a dark strip */}
        {related.length ? (
          <section className="relative overflow-hidden bg-[#001e2c] text-white">
            <div className={`${container} py-16 md:py-20`}>
              <EditableReveal index={0}>
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#fc6736]">Same shelf</p>
                    <h2 className="editable-display mt-3 text-[1.75rem] font-bold tracking-[-0.03em] sm:text-[2.5rem]">More in {collection}</h2>
                  </div>
                  <Link href={taskConfig?.route || '/sbm'} className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#fc6736] hover:text-[#fc6736]">
                    Browse all finds <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </EditableReveal>
              <EditableReveal index={1}>
                <ul className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {related.map((item, i) => {
                    const itemDomain = (() => {
                      const u = getField(item, ['website', 'url', 'link'])
                      return u ? cleanDomain(u) : ''
                    })()
                    return (
                      <li key={item.id || item.slug} className="w-[280px] shrink-0 snap-start sm:w-[320px]">
                        <Link
                          href={`${taskConfig?.route || '/sbm'}/${item.slug}`}
                          className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-[#fc6736] hover:bg-white/[0.06]"
                        >
                          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#fc6736]">№ {String(i + 1).padStart(2, '0')}</span>
                          <h3 className="editable-display mt-3 line-clamp-3 flex-1 text-lg font-bold leading-snug tracking-[-0.02em] text-white group-hover:text-[#fc6736]">{item.title}</h3>
                          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-white/60">
                            <span className="truncate">{itemDomain || getField(item, ['category']) || 'Find'}</span>
                            <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </div>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </EditableReveal>
            </div>
          </section>
        ) : null}
      </main>
    </EditableSiteShell>
  )
}
