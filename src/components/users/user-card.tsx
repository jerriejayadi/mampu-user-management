import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { User } from '@/types'

interface Props {
  user: User
  activity: { posts: number; done: number; pending: number }
}

export function UserCard({ user, activity }: Props) {
  return (
    <Link href={`/users/${user.id}`}>
      <Card className="flex items-center justify-between px-4 py-3 hover:bg-accent transition-colors cursor-pointer">
        <div className="flex flex-col min-w-0 gap-1">
          <span className="font-medium truncate" title={user.name}>
            {user.name}
          </span>
          <span className="text-sm text-muted-foreground truncate">{user.email}</span>
          <div className="flex flex-wrap gap-1.5 mt-1">
            <Badge variant="secondary">{activity.posts} posts</Badge>
            <Badge variant="outline" className="text-green-600 border-green-600">
              {activity.done} done
            </Badge>
            <Badge variant="outline" className="text-orange-500 border-orange-500">
              {activity.pending} pending
            </Badge>
          </div>
        </div>
        <span className="text-muted-foreground ml-4 shrink-0">›</span>
      </Card>
    </Link>
  )
}
