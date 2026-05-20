'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useGetUsers } from '@/services/users/useGetUsers'
import { useGetPosts } from '@/services/posts/useGetPosts'
import { useGetTodos } from '@/services/todos/useGetTodos'
import { useDebounce } from '@/hooks/useDebounce'
import { UserCard } from './user-card'
import { UserFilters, type SortOption, type FilterOption } from './user-filters'
import { UserListSkeleton } from './skeletons'
import type { ActivityMap } from '@/types'

export function UserList() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get('q') ?? '')
  const [appliedSearch, setAppliedSearch] = useState(searchParams.get('q') ?? '')
  const [sort, setSort] = useState<SortOption>(
    (searchParams.get('sort') as SortOption) ?? 'name'
  )
  const [filter, setFilter] = useState<FilterOption>(
    (searchParams.get('filter') as FilterOption) ?? 'all'
  )

  const debouncedSearch = useDebounce(search, 300)

  useEffect(() => {
    setAppliedSearch(debouncedSearch)
  }, [debouncedSearch])

  function applySearch() {
    setAppliedSearch(search)
  }

  useEffect(() => {
    const params = new URLSearchParams()
    if (appliedSearch) params.set('q', appliedSearch)
    if (sort !== 'name') params.set('sort', sort)
    if (filter !== 'all') params.set('filter', filter)
    router.replace(`${pathname}?${params.toString()}`)
  }, [appliedSearch, sort, filter]) // eslint-disable-line react-hooks/exhaustive-deps

  const { data: users, isLoading: usersLoading, error: usersError } = useGetUsers()
  const { data: posts } = useGetPosts()
  const { data: todos } = useGetTodos()

  const activityMap = useMemo<ActivityMap>(() => {
    if (!posts || !todos) return {}
    const map: ActivityMap = {}
    for (const post of posts) {
      if (!map[post.userId]) map[post.userId] = { posts: 0, done: 0, pending: 0 }
      map[post.userId].posts++
    }
    for (const todo of todos) {
      if (!map[todo.userId]) map[todo.userId] = { posts: 0, done: 0, pending: 0 }
      if (todo.completed) map[todo.userId].done++
      else map[todo.userId].pending++
    }
    return map
  }, [posts, todos])

  const filtered = useMemo(() => {
    if (!users) return []
    let result = [...users]

    if (appliedSearch.trim()) {
      const q = appliedSearch.toLowerCase()
      result = result.filter(
        (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      )
    }

    if (filter === 'has-pending') {
      result = result.filter((u) => (activityMap[u.id]?.pending ?? 0) > 0)
    } else if (filter === 'no-completed') {
      result = result.filter((u) => (activityMap[u.id]?.done ?? 0) === 0)
    }

    result.sort((a, b) => {
      if (sort === 'email') return a.email.localeCompare(b.email)
      if (sort === 'pending') return (activityMap[b.id]?.pending ?? 0) - (activityMap[a.id]?.pending ?? 0)
      return a.name.localeCompare(b.name)
    })

    return result
  }, [users, appliedSearch, sort, filter, activityMap])

  if (usersLoading) return <UserListSkeleton />

  if (usersError) {
    return <p className="text-destructive p-4">Failed to load users. Please try again.</p>
  }

  return (
    <div className="flex flex-col gap-4">
      <UserFilters
        search={search}
        sort={sort}
        filter={filter}
        onSearchChange={setSearch}
        onSearchSubmit={applySearch}
        onSortChange={setSort}
        onFilterChange={setFilter}
      />
      {filtered.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">No users match your filters.</p>
      ) : (
        <div className="flex flex-col">
          {filtered.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              activity={activityMap[user.id] ?? { posts: 0, done: 0, pending: 0 }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
