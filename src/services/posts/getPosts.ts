import type { Post } from '@/types'

const URL = 'https://jsonplaceholder.typicode.com/posts'

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(URL)
  if (!res.ok) throw new Error('Failed to fetch posts')
  return res.json()
}
