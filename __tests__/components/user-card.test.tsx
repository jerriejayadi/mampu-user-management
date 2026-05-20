import { render, screen } from '@testing-library/react'
import { UserCard } from '@/components/users/user-card'
import type { User } from '@/types'

const mockUser: User = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  phone: '1-770-736-8031',
  website: 'hildegard.org',
  company: { name: 'Romaguera-Crona', catchPhrase: 'Multi-layered', bs: 'harness' },
  address: { street: 'Kulas Light', suite: 'Apt. 556', city: 'Gwenborough', zipcode: '92998-3874', geo: { lat: '-37', lng: '81' } },
}

const activity = { posts: 10, done: 8, pending: 2 }

it('renders user name', () => {
  render(<UserCard user={mockUser} activity={activity} />)
  expect(screen.getByText('Leanne Graham')).toBeInTheDocument()
})

it('renders compact activity summary', () => {
  render(<UserCard user={mockUser} activity={activity} />)
  expect(screen.getByText(/10 posts/)).toBeInTheDocument()
  expect(screen.getByText('8✓')).toBeInTheDocument()
  expect(screen.getByText('2⏳')).toBeInTheDocument()
})

it('links to user detail page', () => {
  render(<UserCard user={mockUser} activity={activity} />)
  const link = screen.getByRole('link')
  expect(link).toHaveAttribute('href', '/users/1')
})

it('truncates long names gracefully', () => {
  const longNameUser = { ...mockUser, name: 'A'.repeat(100) }
  render(<UserCard user={longNameUser} activity={activity} />)
  expect(screen.getByTitle('A'.repeat(100))).toBeInTheDocument()
})
