'use client'

import { useQuery } from '@/lib/swr'
import type { User } from '@/types'
import { getUserById } from './getUserById'

export function useGetUserById(id: number, config?: Parameters<typeof useQuery>[2]) {
  return useQuery<User | null>(['user', id], () => getUserById(id), config)
}
