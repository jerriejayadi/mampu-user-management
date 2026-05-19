import { Input } from '@/components/ui/input'

export type SortOption = 'name' | 'email'
export type FilterOption = 'all' | 'has-pending' | 'no-completed'

interface Props {
  search: string
  sort: SortOption
  filter: FilterOption
  onSearchChange: (value: string) => void
  onSortChange: (value: SortOption) => void
  onFilterChange: (value: FilterOption) => void
}

export function UserFilters({ search, sort, filter, onSearchChange, onSortChange, onFilterChange }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Input
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1"
      />
      <div className="flex gap-2">
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
