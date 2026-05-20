import { render, screen, fireEvent } from '@testing-library/react'
import { UserFilters } from '@/components/users/user-filters'

const defaultProps = {
  search: '',
  sort: 'name' as const,
  filter: 'all' as const,
  onSearchChange: jest.fn(),
  onSearchSubmit: jest.fn(),
  onSortChange: jest.fn(),
  onFilterChange: jest.fn(),
}

beforeEach(() => jest.clearAllMocks())

it('renders search input', () => {
  render(<UserFilters {...defaultProps} />)
  expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument()
})

it('calls onSearchChange when typing', () => {
  render(<UserFilters {...defaultProps} />)
  fireEvent.change(screen.getByPlaceholderText(/search/i), { target: { value: 'john' } })
  expect(defaultProps.onSearchChange).toHaveBeenCalledWith('john')
})

it('renders sort and filter controls', () => {
  render(<UserFilters {...defaultProps} />)
  expect(screen.getByLabelText(/sort/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/filter/i)).toBeInTheDocument()
})
