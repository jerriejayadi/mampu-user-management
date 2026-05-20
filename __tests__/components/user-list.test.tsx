import { render, screen, fireEvent } from '@testing-library/react'
import { UserList } from '@/components/users/user-list'
import type { User, Post, Todo } from '@/types'

jest.mock('@/services/users/useGetUsers', () => ({
  useGetUsers: jest.fn(),
}))
jest.mock('@/services/posts/useGetPosts', () => ({
  useGetPosts: jest.fn(),
}))
jest.mock('@/services/todos/useGetTodos', () => ({
  useGetTodos: jest.fn(),
}))

import { useGetUsers } from '@/services/users/useGetUsers'
import { useGetPosts } from '@/services/posts/useGetPosts'
import { useGetTodos } from '@/services/todos/useGetTodos'

const mockUsers: User[] = [
  {
    id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz',
    phone: '1-770', website: 'hild.org',
    company: { name: 'Romaguera', catchPhrase: 'Multi', bs: 'harness' },
    address: { street: 'Kulas', suite: 'Apt', city: 'Gwen', zipcode: '929', geo: { lat: '-37', lng: '81' } },
  },
  {
    id: 2, name: 'Ervin Howell', username: 'Antonette', email: 'Shanna@melissa.tv',
    phone: '010-692', website: 'ana.info',
    company: { name: 'Deckow', catchPhrase: 'Pro', bs: 'disintermediate' },
    address: { street: 'Victor Plains', suite: 'Suite 879', city: 'Wisokyburgh', zipcode: '90566', geo: { lat: '-43', lng: '-34' } },
  },
]

const mockPosts: Post[] = [
  { id: 1, userId: 1, title: 'Post 1', body: 'body' },
  { id: 2, userId: 1, title: 'Post 2', body: 'body' },
  { id: 3, userId: 2, title: 'Post 3', body: 'body' },
]

const mockTodos: Todo[] = [
  { id: 1, userId: 1, title: 'Todo 1', completed: true },
  { id: 2, userId: 1, title: 'Todo 2', completed: false },
  { id: 3, userId: 2, title: 'Todo 3', completed: false },
  { id: 4, userId: 2, title: 'Todo 4', completed: false },
]

function setMocks(overrides: { users?: object; posts?: object; todos?: object } = {}) {
  ;(useGetUsers as jest.Mock).mockReturnValue({
    data: mockUsers, isLoading: false, error: null, ...overrides.users,
  })
  ;(useGetPosts as jest.Mock).mockReturnValue({
    data: mockPosts, isLoading: false, error: null, ...overrides.posts,
  })
  ;(useGetTodos as jest.Mock).mockReturnValue({
    data: mockTodos, isLoading: false, error: null, ...overrides.todos,
  })
}

beforeEach(() => setMocks())

it('renders users with activity signals', () => {
  render(<UserList />)
  expect(screen.getByText('Leanne Graham')).toBeInTheDocument()
  expect(screen.getByText('Ervin Howell')).toBeInTheDocument()
  expect(screen.getByText(/2 posts/)).toBeInTheDocument()
  expect(screen.getByText('1✓')).toBeInTheDocument()
  expect(screen.getByText('1⏳')).toBeInTheDocument()
})

it('filters by search query', () => {
  render(<UserList />)
  fireEvent.change(screen.getByPlaceholderText(/search/i), { target: { value: 'Ervin' } })
  expect(screen.queryByText('Leanne Graham')).not.toBeInTheDocument()
  expect(screen.getByText('Ervin Howell')).toBeInTheDocument()
})

it('filters users with pending todos', () => {
  render(<UserList />)
  fireEvent.change(screen.getByLabelText(/filter/i), { target: { value: 'has-pending' } })
  expect(screen.getByText('Leanne Graham')).toBeInTheDocument()
  expect(screen.getByText('Ervin Howell')).toBeInTheDocument()
})

it('filters users with no completed todos', () => {
  render(<UserList />)
  fireEvent.change(screen.getByLabelText(/filter/i), { target: { value: 'no-completed' } })
  expect(screen.queryByText('Leanne Graham')).not.toBeInTheDocument()
  expect(screen.getByText('Ervin Howell')).toBeInTheDocument()
})

it('shows loading state', () => {
  setMocks({ users: { data: undefined, isLoading: true } })
  render(<UserList />)
  expect(screen.getByTestId('user-list-skeleton')).toBeInTheDocument()
})

it('shows error state', () => {
  setMocks({ users: { data: undefined, isLoading: false, error: new Error('failed') } })
  render(<UserList />)
  expect(screen.getByText(/failed to load/i)).toBeInTheDocument()
})

it('shows empty state when filters remove all results', () => {
  render(<UserList />)
  fireEvent.change(screen.getByPlaceholderText(/search/i), { target: { value: 'zzznomatch' } })
  expect(screen.getByText(/no users match/i)).toBeInTheDocument()
})
