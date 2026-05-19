import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { TodosSummary } from './todos-summary'
import type { User, Todo } from '@/types'

interface Props {
  user: User
  todos: Todo[]
}

export function ProfileSidebar({ user, todos }: Props) {
  return (
    <Card className="w-full lg:w-72 shrink-0 h-fit">
      <CardContent className="pt-6 flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-bold">{user.name}</h1>
          <p className="text-sm text-muted-foreground">@{user.username}</p>
        </div>

        <div className="flex flex-col gap-1.5 text-sm">
          <a href={`mailto:${user.email}`} className="text-primary hover:underline truncate">
            {user.email}
          </a>
          <span className="text-muted-foreground">{user.phone}</span>
          <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            {user.website}
          </a>
        </div>

        <Separator />

        <div>
          <p className="text-xs font-semibold uppercase text-muted-foreground mb-1">Company</p>
          <p className="font-medium text-sm">{user.company.name}</p>
          <p className="text-xs text-muted-foreground italic mt-0.5">{user.company.catchPhrase}</p>
        </div>

        <Separator />

        <div>
          <p className="text-xs font-semibold uppercase text-muted-foreground mb-1">Address</p>
          <p className="text-sm">
            {user.address.street}, {user.address.suite}
          </p>
          <p className="text-sm text-muted-foreground">
            {user.address.city}, {user.address.zipcode}
          </p>
        </div>

        <Separator />

        <div>
          <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">Todos</p>
          <TodosSummary todos={todos} />
        </div>
      </CardContent>
    </Card>
  )
}
