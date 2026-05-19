import type { Post } from '@/types'

const BASE = 'https://jsonplaceholder.typicode.com/posts'

export async function getPostsByUserId(userId: number): Promise<Post[]> {
  const res = await fetch(`${BASE}?userId=${userId}`)
  if (!res.ok) throw new Error('Failed to fetch posts')
  return res.json()
}
