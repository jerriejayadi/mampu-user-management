import type { Todo } from '@/types'

const URL = 'https://jsonplaceholder.typicode.com/todos'

export async function getTodos(): Promise<Todo[]> {
  const res = await fetch(URL)
  if (!res.ok) throw new Error('Failed to fetch todos')
  return res.json()
}
