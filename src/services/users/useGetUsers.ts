'use client'

import { useQuery } from '@/lib/swr'
import type { User } from '@/types'
import { getUsers } from './getUsers'

export function useGetUsers(config?: Parameters<typeof useQuery>[2]) {
  return useQuery<User[]>('users', getUsers, config)
}
