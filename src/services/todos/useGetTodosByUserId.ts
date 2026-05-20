'use client'

import { useQuery } from '@/lib/swr'
import type { SWRConfiguration } from 'swr'
import type { Todo } from '@/types'
import { getTodosByUserId } from './getTodosByUserId'

export function useGetTodosByUserId(userId: number, config?: SWRConfiguration<Todo[]>) {
  return useQuery<Todo[]>(['todos', userId], () => getTodosByUserId(userId), config)
}
