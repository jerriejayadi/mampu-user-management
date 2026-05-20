import { render, screen, fireEvent } from '@testing-library/react'
import UsersError from '@/app/users/error'

const mockError = new Error('Network failure')
const mockReset = jest.fn()

beforeEach(() => jest.clearAllMocks())

it('renders error heading and message', () => {
  render(<UsersError error={mockError} reset={mockReset} />)
  expect(screen.getByRole('heading', { name: /failed to load users/i })).toBeInTheDocument()
  expect(screen.getByText('Network failure')).toBeInTheDocument()
})

it('shows fallback message when error has no message', () => {
  render(<UsersError error={new Error('')} reset={mockReset} />)
  expect(screen.getByText(/an unexpected error occurred/i)).toBeInTheDocument()
})

it('calls reset when try again clicked', () => {
  render(<UsersError error={mockError} reset={mockReset} />)
  fireEvent.click(screen.getByRole('button', { name: /try again/i }))
  expect(mockReset).toHaveBeenCalledTimes(1)
})
