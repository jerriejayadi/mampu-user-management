import { render, screen } from '@testing-library/react'
import { ProfileSidebar } from '@/components/user-detail/profile-sidebar'
import type { User } from '@/types'

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

it('renders user name, username, email, phone, website', () => {
  render(<ProfileSidebar user={mockUser} />)
  expect(screen.getByText('Leanne Graham')).toBeInTheDocument()
  expect(screen.getByText('@Bret')).toBeInTheDocument()
  expect(screen.getByText('Sincere@april.biz')).toBeInTheDocument()
  expect(screen.getByText('1-770-736-8031')).toBeInTheDocument()
  expect(screen.getByText('hildegard.org')).toBeInTheDocument()
})

it('renders company name and catchphrase', () => {
  render(<ProfileSidebar user={mockUser} />)
  expect(screen.getByText('Romaguera-Crona')).toBeInTheDocument()
  expect(screen.getByText('Multi-layered client-server neural-net')).toBeInTheDocument()
})

it('renders address fields', () => {
  render(<ProfileSidebar user={mockUser} />)
  expect(screen.getByText(/Kulas Light/)).toBeInTheDocument()
  expect(screen.getByText(/Gwenborough/)).toBeInTheDocument()
})
