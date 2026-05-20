import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getUserById } from '@/services/users/getUserById'
import { getPostsByUserId } from '@/services/posts/getPostsByUserId'
import { getTodosByUserId } from '@/services/todos/getTodosByUserId'
import { ProfileSidebar } from '@/components/user-detail/profile-sidebar'
import { ContentTabs } from '@/components/user-detail/content-tabs'
import Link from 'next/link'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const user = await getUserById(Number(id))
  if (!user) return { title: 'User Not Found — Mampu' }
  return {
    title: `${user.name} — Mampu`,
    description: `${user.name} works at ${user.company.name}. ${user.company.catchPhrase}.`,
  }
}

export default async function UserDetailPage({ params }: Props) {
  const { id } = await params
  const userId = Number(id)

  if (isNaN(userId)) notFound()

  const [user, posts, todos] = await Promise.all([
    getUserById(userId),
    getPostsByUserId(userId),
    getTodosByUserId(userId),
  ])

  if (!user) notFound()

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Link
        href="/users"
        className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1"
      >
        ← Back to list
      </Link>
      <div className="flex flex-col lg:flex-row gap-6 mt-4">
        <ProfileSidebar user={user} />
        <div className="flex-1">
          <ContentTabs posts={posts} todos={todos} />
        </div>
      </div>
    </div>
  )
}
