import Link from 'next/link'
import type { User } from '@/types'

interface Props {
  user: User
  activity: { posts: number; done: number; pending: number }
}

export function UserCard({ user, activity }: Props) {
  return (
    <Link
      href={`/users/${user.id}`}
      className="flex items-center justify-between py-3 px-1 border-b border-border hover:bg-accent transition-colors"
    >
      <div className="flex flex-col min-w-0 gap-0.5">
        <span className="font-medium truncate" title={user.name}>
          {user.name}
        </span>
        <span className="text-sm text-muted-foreground">
          {activity.posts} posts
          {' · '}
          <span className="text-green-600">{activity.done}✓</span>
          {' · '}
          <span className="text-orange-500">{activity.pending}⏳</span>
        </span>
      </div>
      <span className="text-muted-foreground ml-4 shrink-0">›</span>
    </Link>
  )
}
