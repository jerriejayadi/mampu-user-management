import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export type SortOption = 'name' | 'email' | 'pending'
export type FilterOption = 'all' | 'has-pending' | 'no-completed'

interface Props {
  search: string
  sort: SortOption
  filter: FilterOption
  onSearchChange: (value: string) => void
  onSearchSubmit: () => void
  onSortChange: (value: SortOption) => void
  onFilterChange: (value: FilterOption) => void
}

export function UserFilters({ search, sort, filter, onSearchChange, onSearchSubmit, onSortChange, onFilterChange }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit()}
          className="pr-9"
        />
        <button
          type="button"
          onClick={onSearchSubmit}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Search"
        >
          <Search size={16} />
        </button>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex flex-col gap-1">
          <label htmlFor="sort-select" className="sr-only">Sort</label>
          <select
            id="sort-select"
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            aria-label="Sort"
          >
            <option value="name">Sort: Name</option>
            <option value="email">Sort: Email</option>
            <option value="pending">Sort: Most Pending</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="filter-select" className="sr-only">Filter</label>
          <select
            id="filter-select"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value as FilterOption)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            aria-label="Filter"
          >
            <option value="all">All users</option>
            <option value="has-pending">Has pending todos</option>
            <option value="no-completed">No completed todos</option>
          </select>
        </div>
      </div>
    </div>
  )
}
