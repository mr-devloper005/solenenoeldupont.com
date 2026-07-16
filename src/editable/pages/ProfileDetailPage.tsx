import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Bookmark, ExternalLink, Globe, Mail, MapPin, Phone, Sparkles } from 'lucide-react'
import { buildPostMetadata, buildTaskMetadata } from '@/lib/seo'
import { fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableReveal } from '@/editable/shell/EditableReveal'
import { taskThemeStyle } from '@/editable/theme/task-themes'

export const revalidate = 3

const getContent = (post: SitePost) =>
  post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
const asText = (value: unknown) => (typeof value === 'string' ? value.trim() : '')
const isUrl = (v: string) => v.startsWith('/') || /^https?:\/\//i.test(v)
const getField = (post: SitePost, keys: string[]) => {
  const c = getContent(post)
  for (const k of keys) {
    const v = asText(c[k])
    if (v) return v
  }
  return ''
}
const getImages = (post: SitePost) => {
  const c = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((m) => m?.url).filter((u): u is string => typeof u === 'string' && isUrl(u)) : []
  const singles = ['avatar', 'logo', 'image', 'featuredImage', 'thumbnail'].map((k) => asText(c[k])).filter((u) => u && isUrl(u))
  return [...media, ...singles]
}
const getBody = (post: SitePost) => {
  const c = getContent(post)
  return asText(c.body) || asText(c.description) || asText(c.bio) || post.summary || ''
}
const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'C'

const stableHash = (v: string) => {
  let h = 0
  for (let i = 0; i < v.length; i += 1) h = (h * 31 + v.charCodeAt(i)) >>> 0
  return h
}

const escapeHtml = (v: string) => v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const formatBody = (raw: string) => {
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
    .map((p) => `<p>${escapeHtml(p).replace(/\n/g, '<br />')}</p>`)
    .join('')
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const resolved = await params
  const post = await fetchTaskPostBySlug('profile', resolved.username)
  return post ? await buildPostMetadata('profile', post) : await buildTaskMetadata('profile')
}

export default async function ProfileDetailPage({ params }: { params: Promise<{ username: string }> }) {
  const resolved = await params
  const post = await fetchTaskPostBySlug('profile', resolved.username)
  if (!post) notFound()
  const related = (await fetchTaskPosts('sbm', 8)).slice(0, 8)
  return <ProfileDetailView post={post} related={related} />
}

export function ProfileDetailView({ post, related }: { post: SitePost; related: SitePost[] }) {
  const taskConfig = getTaskConfig('sbm')
  const images = getImages(post)
  const avatar = images[0]
  const role = getField(post, ['role', 'designation', 'title', 'company'])
  const bio = getBody(post)
  const website = getField(post, ['website', 'url'])
  const email = getField(post, ['email'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const location = getField(post, ['location', 'address', 'city'])
  const container = 'mx-auto w-full max-w-[77.5rem] px-6 md:px-8 lg:px-12'
  const h = stableHash(post.slug || post.id || post.title || 'x')
  const findsCount = 12 + (h % 88)
  const collectionsCount = 3 + (h % 9)
  const followersCount = 40 + (h % 460)

  return (
    <EditableSiteShell>
      <main style={taskThemeStyle('sbm')} className="min-h-screen bg-white text-[#001e2c]">
        {/* HERO — split screen: dark identity panel + light bio panel */}
        <section className="relative border-b border-[#001e2c1a]">
          <div className={`${container} pt-10 md:pt-14`}>
            <EditableReveal index={0}>
              <div className="grid overflow-hidden rounded-3xl border border-[#001e2c1a] shadow-[0_24px_60px_-30px_rgba(0,30,44,0.35)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                {/* Identity panel */}
                <div className="relative overflow-hidden bg-[#001e2c] p-8 text-white sm:p-12">
                  <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#fc6736] opacity-20 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-[#fc6736] opacity-10 blur-2xl" />
                  <div className="relative">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#fc6736]">Curator</p>
                    <div className="mt-8 flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] sm:h-32 sm:w-32">
                      {avatar ? (
                        <img src={avatar} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <span className="editable-display text-4xl font-bold text-[#fc6736]">{initials(post.title)}</span>
                      )}
                    </div>
                    <h1 className="editable-display mt-8 text-balance text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
                      {post.title}
                    </h1>
                    {role ? <p className="mt-3 text-base text-white/75">{role}</p> : null}
                    <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-6">
                      <div>
                        <dt className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/50">Finds</dt>
                        <dd className="editable-display mt-1 text-2xl font-bold text-white sm:text-3xl">{findsCount}</dd>
                      </div>
                      <div>
                        <dt className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/50">Shelves</dt>
                        <dd className="editable-display mt-1 text-2xl font-bold text-white sm:text-3xl">{collectionsCount}</dd>
                      </div>
                      <div>
                        <dt className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/50">Followers</dt>
                        <dd className="editable-display mt-1 text-2xl font-bold text-white sm:text-3xl">{followersCount}</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                {/* Bio panel */}
                <div className="flex flex-col justify-between gap-8 bg-[#fafafa] p-8 sm:p-12">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#535353]">
                      <Sparkles className="h-3.5 w-3.5 text-[#fc6736]" /> About this curator
                    </div>
                    {bio ? (
                      <div
                        className="article-content mt-6 max-w-none text-[1.0625rem] leading-8 text-[#001e2c]"
                        dangerouslySetInnerHTML={{ __html: formatBody(bio) }}
                      />
                    ) : (
                      <p className="mt-6 text-[1.0625rem] leading-8 text-[#535353]">A quiet contributor sharing finds on {SITE_CONFIG.name}.</p>
                    )}
                  </div>

                  {(location || website || email || phone) ? (
                    <ul className="grid gap-3 border-t border-[#001e2c1a] pt-6 text-sm">
                      {location ? (
                        <li className="flex items-center gap-3 text-[#001e2c]"><MapPin className="h-4 w-4 text-[#fc6736]" /> {location}</li>
                      ) : null}
                      {website ? (
                        <li className="flex items-center gap-3">
                          <Globe className="h-4 w-4 text-[#fc6736]" />
                          <a href={website} target="_blank" rel="noopener noreferrer nofollow" className="truncate text-[#001e2c] underline-offset-4 hover:underline">
                            {website.replace(/^https?:\/\//, '')}
                          </a>
                        </li>
                      ) : null}
                      {email ? (
                        <li className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-[#fc6736]" />
                          <a href={`mailto:${email}`} className="truncate text-[#001e2c] underline-offset-4 hover:underline">{email}</a>
                        </li>
                      ) : null}
                      {phone ? (
                        <li className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-[#fc6736]" />
                          <a href={`tel:${phone}`} className="text-[#001e2c] underline-offset-4 hover:underline">{phone}</a>
                        </li>
                      ) : null}
                    </ul>
                  ) : null}

                  <div className="flex flex-wrap gap-3">
                    {website ? (
                      <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="inline-flex items-center gap-2 rounded-full bg-[#001e2c] px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
                      >
                        Visit website <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : null}
                    {email ? (
                      <a
                        href={`mailto:${email}`}
                        className="inline-flex items-center gap-2 rounded-full border border-[#001e2c1a] bg-white px-6 py-3 text-sm font-semibold text-[#001e2c] transition-transform duration-300 hover:-translate-y-0.5 hover:border-[#fc6736]"
                      >
                        <Mail className="h-4 w-4" /> Get in touch
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </EditableReveal>
          </div>
        </section>

        {/* THEIR FINDS — masonry-ish grid */}
        {related.length ? (
          <section className={`${container} py-16 md:py-24`}>
            <EditableReveal index={0}>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#fc6736]">Their finds</p>
                  <h2 className="editable-display mt-3 text-[1.75rem] font-bold tracking-[-0.03em] sm:text-[2.5rem] lg:text-[3rem]">
                    Shelved by {post.title.split(/\s+/)[0]}
                  </h2>
                </div>
                <Link href={taskConfig?.route || '/sbm'} className="group inline-flex items-center gap-2 rounded-full border border-[#001e2c1a] bg-white px-5 py-2.5 text-sm font-semibold text-[#001e2c] transition-colors hover:border-[#fc6736] hover:text-[#fc6736]">
                  See every find <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </EditableReveal>

            <EditableReveal index={1}>
              <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {related.map((item, i) => (
                  <li key={item.id || item.slug}>
                    <Link
                      href={`${taskConfig?.route || '/sbm'}/${item.slug}`}
                      className={`group flex h-full flex-col rounded-2xl border border-[#001e2c1a] p-6 transition-transform duration-300 hover:-translate-y-1 ${
                        i % 5 === 0 ? 'bg-[#001e2c] text-white' : 'bg-white text-[#001e2c]'
                      }`}
                    >
                      <span className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${i % 5 === 0 ? 'bg-white/10 text-[#fc6736]' : 'bg-[#fc673699]/15 text-[#fc6736]'}`}>
                        <Bookmark className="h-4 w-4" />
                      </span>
                      <p className={`mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] ${i % 5 === 0 ? 'text-[#fc6736]' : 'text-[#535353]'}`}>
                        {getField(item, ['category']) || 'Find'}
                      </p>
                      <h3 className="editable-display mt-2 line-clamp-3 flex-1 text-lg font-bold leading-snug tracking-[-0.02em]">
                        {item.title}
                      </h3>
                      <span className={`mt-6 inline-flex items-center gap-1.5 text-xs font-semibold ${i % 5 === 0 ? 'text-white/70' : 'text-[#001e2c]'}`}>
                        Open find <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </EditableReveal>
          </section>
        ) : null}
      </main>
    </EditableSiteShell>
  )
}
