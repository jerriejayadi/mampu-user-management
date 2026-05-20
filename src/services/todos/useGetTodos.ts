'use client'

import { useQuery } from '@/lib/swr'
import type { SWRConfiguration } from 'swr'
import type { Todo } from '@/types'
import { getTodos } from './getTodos'

export function useGetTodos(config?: SWRConfiguration<Todo[]>) {
  return useQuery<Todo[]>('todos', getTodos, config)
}
