import { render, screen } from '@testing-library/react'
import { TodosSummary } from '@/components/user-detail/todos-summary'
import type { Todo } from '@/types'

const todos: Todo[] = [
  { id: 1, userId: 1, title: 'Buy milk', completed: true },
  { id: 2, userId: 1, title: 'Walk dog', completed: false },
  { id: 3, userId: 1, title: 'Read book', completed: false },
]

it('shows correct done and pending counts', () => {
  render(<TodosSummary todos={todos} />)
  expect(screen.getByText('1')).toBeInTheDocument()
  expect(screen.getByText('2')).toBeInTheDocument()
  expect(screen.getByText(/done/i)).toBeInTheDocument()
  expect(screen.getByText(/pending/i)).toBeInTheDocument()
})

it('handles empty todos', () => {
  render(<TodosSummary todos={[]} />)
  expect(screen.getAllByText('0')).toHaveLength(2)
})
