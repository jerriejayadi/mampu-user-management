import type { Todo } from '@/types'

interface Props {
  todos: Todo[]
}

export function TodosSummary({ todos }: Props) {
  const done = todos.filter((t) => t.completed).length
  const pending = todos.filter((t) => !t.completed).length

  return (
    <div className="flex gap-4">
      <div className="text-center">
        <p className="text-2xl font-bold text-green-600">{done}</p>
        <p className="text-xs text-muted-foreground">done</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-orange-500">{pending}</p>
        <p className="text-xs text-muted-foreground">pending</p>
      </div>
    </div>
  )
}
