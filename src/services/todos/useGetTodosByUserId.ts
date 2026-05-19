'use client'

import { useQuery } from '@/lib/swr'
import type { Todo } from '@/types'
import { getTodosByUserId } from './getTodosByUserId'

export function useGetTodosByUserId(userId: number, config?: Parameters<typeof useQuery>[2]) {
  return useQuery<Todo[]>(['todos', userId], () => getTodosByUserId(userId), config)
}
