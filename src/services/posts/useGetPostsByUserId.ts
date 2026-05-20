'use client'

import { useQuery } from '@/lib/swr'
import type { SWRConfiguration } from 'swr'
import type { Post } from '@/types'
import { getPostsByUserId } from './getPostsByUserId'

export function useGetPostsByUserId(userId: number, config?: SWRConfiguration<Post[]>) {
  return useQuery<Post[]>(['posts', userId], () => getPostsByUserId(userId), config)
}
