import Link from 'next/link'
import { ArrowUpRight, Globe } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editablePalette as pal } from '@/editable/layouts/design-contract'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const logo = typeof content.logo === 'string' ? content.logo : ''
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

export function toPlainText(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;|&apos;/gi, "'")
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    (typeof post?.summary === 'string' && post.summary) ||
    (typeof content.body === 'string' && content.body) ||
    (typeof content.excerpt === 'string' && content.excerpt) ||
    ''
  const clean = toPlainText(raw)
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Collection'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

function getDomain(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const url = (typeof content.website === 'string' && content.website) || (typeof content.url === 'string' && content.url) || ''
  try {
    if (url) return new URL(url).hostname.replace(/^www\./, '')
  } catch {}
  return ''
}

/* ─────────────── shared visual card (flat white, hairline, lift) ─────────────── */
function BaseCard({ post, href, className = '' }: { post: SitePost; href: string; className?: string }) {
  const image = getEditablePostImage(post)
  const category = getEditableCategory(post)
  const domain = getDomain(post)
  const excerpt = getEditableExcerpt(post, 110)
  return (
    <Link
      href={href}
      className={`group flex flex-col overflow-hidden rounded-2xl border ${pal.border} bg-white transition duration-300 hover:-translate-y-1 hover:border-[var(--slot4-page-text)]/40 ${className}`}
    >
      <div className={`relative aspect-[3/2] overflow-hidden ${pal.mediaBg}`}>
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" loading="lazy" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--slot4-muted-text)]">
          {domain ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--slot4-panel-bg)] px-2.5 py-1">
              <Globe className="h-3 w-3" /> {domain}
            </span>
          ) : null}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--slot4-panel-bg)] px-2.5 py-1 text-[var(--slot4-accent)]">
            {category}
          </span>
        </div>
        <h3 className="editable-display line-clamp-2 text-lg font-bold leading-snug tracking-[-0.02em] text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">
          {post.title}
        </h3>
        {excerpt ? (
          <p className="line-clamp-1 text-sm leading-6 text-[var(--slot4-muted-text)]">{excerpt}</p>
        ) : null}
      </div>
    </Link>
  )
}

export function EditorialFeatureCard({ post, href, label = 'Featured find' }: { post: SitePost; href: string; label?: string }) {
  const image = getEditablePostImage(post)
  return (
    <Link href={href} className="group block overflow-hidden rounded-2xl bg-[var(--slot4-dark-bg)] text-white transition duration-300 hover:-translate-y-1">
      <div className="relative min-h-[420px] p-8 sm:p-10 lg:min-h-[520px]">
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40 transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,30,44,0.2),rgba(0,30,44,0.85))]" />
        <div className="relative z-10 flex h-full min-h-[380px] flex-col justify-end lg:min-h-[460px]">
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{label}</span>
          <h3 className="editable-display mt-4 max-w-3xl text-3xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-4xl lg:text-5xl">
            {post.title}
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80">{getEditableExcerpt(post, 180)}</p>
          <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[var(--slot4-page-text)]">
            Open find <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href }: { post: SitePost; href: string; index?: number }) {
  return <BaseCard post={post} href={href} className="w-[280px] shrink-0 snap-start" />
}

export function CompactIndexCard({ post, href }: { post: SitePost; href: string; index?: number }) {
  return <BaseCard post={post} href={href} />
}

export function ArticleListCard({ post, href }: { post: SitePost; href: string; index?: number }) {
  return <BaseCard post={post} href={href} />
}
