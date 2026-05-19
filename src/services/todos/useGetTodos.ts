'use client'

import { useQuery } from '@/lib/swr'
import type { Todo } from '@/types'
import { getTodos } from './getTodos'

export function useGetTodos(config?: Parameters<typeof useQuery>[2]) {
  return useQuery<Todo[]>('todos', getTodos, config)
}
