'use client'

import { useQuery } from '@/lib/swr'
import type { SWRConfiguration } from 'swr'
import type { Post } from '@/types'
import { getPosts } from './getPosts'

export function useGetPosts(config?: SWRConfiguration<Post[]>) {
  return useQuery<Post[]>('posts', getPosts, config)
}
