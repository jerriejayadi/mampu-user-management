'use client'

import { useQuery } from '@/lib/swr'
import type { Post } from '@/types'
import { getPosts } from './getPosts'

export function useGetPosts(config?: Parameters<typeof useQuery>[2]) {
  return useQuery<Post[]>('posts', getPosts, config)
}
