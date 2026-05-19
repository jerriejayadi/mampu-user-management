import type { Todo } from '@/types'

const BASE = 'https://jsonplaceholder.typicode.com/todos'

export async function getTodosByUserId(userId: number): Promise<Todo[]> {
  const res = await fetch(`${BASE}?userId=${userId}`)
  if (!res.ok) throw new Error('Failed to fetch todos')
  return res.json()
}
