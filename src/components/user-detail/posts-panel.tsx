import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { Post } from '@/types'

interface Props {
  posts: Post[]
}

export function PostsPanel({ posts }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Posts ({posts.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {posts.length === 0 ? (
          <p className="text-muted-foreground text-sm">No posts yet.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {posts.map((post, i) => (
              <li key={post.id}>
                <p className="font-medium text-sm capitalize leading-snug">{post.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{post.body}</p>
                {i < posts.length - 1 && <Separator className="mt-3" />}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
