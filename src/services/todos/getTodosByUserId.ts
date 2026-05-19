import { useQuery } from '@/lib/swr'
import type { Todo } from '@/types'

const BASE = 'https://jsonplaceholder.typicode.com/todos'

export async function getTodosByUserId(userId: number): Promise<Todo[]> {
  const res = await fetch(`${BASE}?userId=${userId}`)
  if (!res.ok) throw new Error('Failed to fetch todos')
  return res.json()
}

export function useGetTodosByUserId(userId: number, config?: Parameters<typeof useQuery>[2]) {
  return useQuery<Todo[]>(['todos', userId], () => getTodosByUserId(userId), config)
}
