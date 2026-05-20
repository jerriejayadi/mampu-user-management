'use client'

import { useQuery } from '@/lib/swr'
import type { SWRConfiguration } from 'swr'
import type { User } from '@/types'
import { getUserById } from './getUserById'

export function useGetUserById(id: number, config?: SWRConfiguration<User | null>) {
  return useQuery<User | null>(['user', id], () => getUserById(id), config)
}
