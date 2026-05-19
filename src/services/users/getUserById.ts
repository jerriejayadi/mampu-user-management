import { useQuery } from '@/lib/swr'
import type { User } from '@/types'

const BASE = 'https://jsonplaceholder.typicode.com/users'

export async function getUserById(id: number): Promise<User | null> {
  const res = await fetch(`${BASE}/${id}`)
  if (!res.ok) return null
  return res.json()
}

export function useGetUserById(id: number, config?: Parameters<typeof useQuery>[2]) {
  return useQuery<User | null>(['user', id], () => getUserById(id), config)
}
