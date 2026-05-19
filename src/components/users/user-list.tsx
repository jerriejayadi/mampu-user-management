'use client'

import { useState, useMemo } from 'react'
import { useGetUsers } from '@/services/users/getUsers'
import { useGetPosts } from '@/services/posts/getPosts'
import { useGetTodos } from '@/services/todos/getTodos'
import { UserCard } from './user-card'
import { UserFilters, type SortOption, type FilterOption } from './user-filters'
import { UserListSkeleton } from './skeletons'
import type { ActivityMap } from '@/types'

export function UserList() {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortOption>('name')
  const [filter, setFilter] = useState<FilterOption>('all')

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

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      )
    }

    if (filter === 'has-pending') {
      result = result.filter((u) => (activityMap[u.id]?.pending ?? 0) > 0)
    } else if (filter === 'no-completed') {
      result = result.filter((u) => (activityMap[u.id]?.done ?? 0) === 0)
    }

    result.sort((a, b) =>
      sort === 'name'
        ? a.name.localeCompare(b.name)
        : a.email.localeCompare(b.email)
    )

    return result
  }, [users, search, sort, filter, activityMap])

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
        onSortChange={setSort}
        onFilterChange={setFilter}
      />
      {filtered.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">No users match your filters.</p>
      ) : (
        <div className="flex flex-col gap-2">
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
