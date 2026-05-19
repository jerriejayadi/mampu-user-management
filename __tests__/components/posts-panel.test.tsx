import { render, screen } from '@testing-library/react'
import { PostsPanel } from '@/components/user-detail/posts-panel'
import type { Post } from '@/types'

const mockPosts: Post[] = [
  { id: 1, userId: 1, title: 'First post title', body: 'Some body text' },
  { id: 2, userId: 1, title: 'Second post title', body: 'More body text' },
]

it('renders post titles', () => {
  render(<PostsPanel posts={mockPosts} />)
  expect(screen.getByText('First post title')).toBeInTheDocument()
  expect(screen.getByText('Second post title')).toBeInTheDocument()
})

it('shows post count in heading', () => {
  render(<PostsPanel posts={mockPosts} />)
  expect(screen.getByText(/2/)).toBeInTheDocument()
})

it('shows empty state when no posts', () => {
  render(<PostsPanel posts={[]} />)
  expect(screen.getByText(/no posts/i)).toBeInTheDocument()
})
