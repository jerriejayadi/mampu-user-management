import type { User } from '@/types'

const BASE = 'https://jsonplaceholder.typicode.com/users'

export async function getUserById(id: number): Promise<User | null> {
  const res = await fetch(`${BASE}/${id}`)
  if (!res.ok) return null
  return res.json()
}
