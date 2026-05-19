'use client'

import { useQuery } from '@/lib/swr'
import type { Post } from '@/types'
import { getPostsByUserId } from './getPostsByUserId'

export function useGetPostsByUserId(userId: number, config?: Parameters<typeof useQuery>[2]) {
  return useQuery<Post[]>(['posts', userId], () => getPostsByUserId(userId), config)
}
