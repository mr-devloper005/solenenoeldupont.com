import type { Metadata } from 'next'
import { buildTaskMetadata } from '@/lib/seo'
import { normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts } from '@/lib/task-data'
import { getTaskConfig } from '@/lib/site-config'
import { taskPageMetadata } from '@/config/site.content'
import { TaskArchiveView } from '@/editable/pages/TaskArchivePage'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  const base = await buildTaskMetadata('profile', {
    path: '/profile',
    title: taskPageMetadata.profile?.title,
    description: taskPageMetadata.profile?.description,
  })
  return { ...base, robots: { index: false, follow: false } }
}

export async function ProfilePageTaskPage(props?: {
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await props?.searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const basePath = props?.basePath || getTaskConfig('profile')?.route || '/profile'
  const { posts, pagination } = await fetchPaginatedTaskPosts('profile', { page, limit: 24, category })
  return <TaskArchiveView task="profile" posts={posts} pagination={pagination} category={category} basePath={basePath} />
}

export const ProfileTaskPage = ProfilePageTaskPage

export default ProfilePageTaskPage
