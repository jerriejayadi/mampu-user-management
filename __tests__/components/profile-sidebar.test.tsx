import { render, screen } from '@testing-library/react'
import { ProfileSidebar } from '@/components/user-detail/profile-sidebar'
import type { User, Todo } from '@/types'

const mockUser: User = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  phone: '1-770-736-8031',
  website: 'hildegard.org',
  company: { name: 'Romaguera-Crona', catchPhrase: 'Multi-layered client-server neural-net', bs: 'harness' },
  address: { street: 'Kulas Light', suite: 'Apt. 556', city: 'Gwenborough', zipcode: '92998-3874', geo: { lat: '-37', lng: '81' } },
}

const todos: Todo[] = [
  { id: 1, userId: 1, title: 'Todo 1', completed: true },
  { id: 2, userId: 1, title: 'Todo 2', completed: false },
]

it('renders user name, username, email, phone, website', () => {
  render(<ProfileSidebar user={mockUser} todos={todos} />)
  expect(screen.getByText('Leanne Graham')).toBeInTheDocument()
  expect(screen.getByText('@Bret')).toBeInTheDocument()
  expect(screen.getByText('Sincere@april.biz')).toBeInTheDocument()
  expect(screen.getByText('1-770-736-8031')).toBeInTheDocument()
  expect(screen.getByText('hildegard.org')).toBeInTheDocument()
})

it('renders company name and catchphrase', () => {
  render(<ProfileSidebar user={mockUser} todos={todos} />)
  expect(screen.getByText('Romaguera-Crona')).toBeInTheDocument()
  expect(screen.getByText('Multi-layered client-server neural-net')).toBeInTheDocument()
})

it('renders address fields', () => {
  render(<ProfileSidebar user={mockUser} todos={todos} />)
  expect(screen.getByText(/Kulas Light/)).toBeInTheDocument()
  expect(screen.getByText(/Gwenborough/)).toBeInTheDocument()
})

it('renders todos summary', () => {
  render(<ProfileSidebar user={mockUser} todos={todos} />)
  expect(screen.getAllByText('1').length).toBeGreaterThanOrEqual(1)
  expect(screen.getByText('done')).toBeInTheDocument()
})
