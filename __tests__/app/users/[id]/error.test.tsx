import { render, screen, fireEvent } from '@testing-library/react'
import UserDetailError from '@/app/users/[id]/error'

jest.mock('next/link', () => ({ __esModule: true, default: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a> }))

const mockError = new Error('Failed to fetch user')
const mockReset = jest.fn()

beforeEach(() => jest.clearAllMocks())

it('renders error heading and message', () => {
  render(<UserDetailError error={mockError} reset={mockReset} />)
  expect(screen.getByRole('heading', { name: /failed to load user/i })).toBeInTheDocument()
  expect(screen.getByText('Failed to fetch user')).toBeInTheDocument()
})

it('shows fallback message when error has no message', () => {
  render(<UserDetailError error={new Error('')} reset={mockReset} />)
  expect(screen.getByText(/an unexpected error occurred/i)).toBeInTheDocument()
})

it('calls reset when try again clicked', () => {
  render(<UserDetailError error={mockError} reset={mockReset} />)
  fireEvent.click(screen.getByRole('button', { name: /try again/i }))
  expect(mockReset).toHaveBeenCalledTimes(1)
})

it('has back to list link', () => {
  render(<UserDetailError error={mockError} reset={mockReset} />)
  expect(screen.getByRole('link', { name: /back to list/i })).toHaveAttribute('href', '/users')
})
