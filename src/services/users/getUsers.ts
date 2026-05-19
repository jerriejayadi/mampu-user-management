import type { User } from '@/types'

const URL = 'https://jsonplaceholder.typicode.com/users'

export async function getUsers(): Promise<User[]> {
  const res = await fetch(URL)
  if (!res.ok) throw new Error('Failed to fetch users')
  return res.json()
}
