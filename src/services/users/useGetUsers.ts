'use client'

import { useQuery } from '@/lib/swr'
import type { SWRConfiguration } from 'swr'
import type { User } from '@/types'
import { getUsers } from './getUsers'

export function useGetUsers(config?: SWRConfiguration<User[]>) {
  return useQuery<User[]>('users', getUsers, config)
}
