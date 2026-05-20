# Users UI Design Spec
Date: 2026-05-19

## Visual Design

- **Theme**: Dark + Light, defaults to system `prefers-color-scheme`, manual toggle in sidebar saves to `localStorage`
- **Accent color**: Indigo (`#6366f1`)
- **Navigation**: Icon-rail sidebar (collapses to icons on mobile)
- **List layout**: Compact row cards on both desktop and mobile — no table. Desktop shows more columns, mobile narrows. Consistent mental model throughout.
- **Detail layout**: Profile sidebar pinned left (name, email, company, address, todo stats), posts panel on right

## File Structure

```
app/
├── layout.tsx                  # Root layout — sidebar + theme provider
├── page.tsx                    # Redirect → /users
├── users/
│   ├── page.tsx                # "use client" — SWR fetches users+posts+todos
│   ├── loading.tsx             # Skeleton for list
│   └── [id]/
│       ├── page.tsx            # Server Component — fetch user+posts+todos
│       └── loading.tsx         # Skeleton for detail

components/
├── ui/                         # shadcn atoms (button, input, badge, skeleton, card, separator)
├── sidebar.tsx                 # Icon rail nav + theme toggle
├── theme-provider.tsx          # next-themes wrapper
├── users/
│   ├── user-list.tsx           # List + search/sort/filter UI
│   ├── user-card.tsx           # Single compact row card
│   ├── user-filters.tsx        # Search input + filter/sort controls
│   └── skeletons.tsx           # Loading skeletons
└── user-detail/
    ├── profile-sidebar.tsx     # Left: name/email/company/address + todo stats
    ├── posts-panel.tsx         # Right: posts list
    └── todos-summary.tsx       # Todo counts inside profile sidebar

lib/
└── swr.ts                      # Base useQuery wrapper with default SWR config

services/
├── users/
│   ├── getUsers.ts             # getUsers() fetch fn + useGetUsers(params?, config?) hook
│   └── getUserById.ts          # getUserById(id) fetch fn + useGetUserById(id, config?) hook
├── posts/
│   ├── getPosts.ts             # getPosts() + useGetPosts(config?)
│   └── getPostsByUserId.ts     # getPostsByUserId(id) + useGetPostsByUserId(id, config?)
└── todos/
    ├── getTodos.ts             # getTodos() + useGetTodos(config?)
    └── getTodosByUserId.ts     # getTodosByUserId(id) + useGetTodosByUserId(id, config?)
```

## Shadcn Components

Install only: `button`, `input`, `badge`, `skeleton`, `card`, `separator`

## Data Fetching Strategy

### `/users` — Client Component
- `useGetUsers()` + `useGetPosts()` + `useGetTodos()` fire in parallel on mount
- Client merges into `activityMap: Record<userId, { posts: number, done: number, pending: number }>`
- Search/sort/filter operate on merged in-memory data — no re-fetches
- Filter/sort state stored in URL search params (`?q=&sort=&filter=`) — browser back restores state free

### `/users/[id]` — Server Component
- Three parallel `fetch()` calls: `getUserById(id)`, `getPostsByUserId(id)`, `getTodosByUserId(id)`
- Invalid `id` → `notFound()` → Next.js 404
- `generateMetadata` for SEO

## Service Layer Pattern

Each service file exports one fetch function + one hook:

```ts
// services/users/getUsers.ts
export async function getUsers(): Promise<User[]> { ... }

export function useGetUsers(params?: GetUsersParams, config?: SWRConfig) {
  return useQuery(['users', params], () => getUsers(params), config)
}
```

Server Components import the fetch function directly.
Client Components import the hook.

## Error & Edge Cases

| Scenario | Handling |
|---|---|
| List fetch fails | SWR error state → inline error message |
| Invalid `/users/[id]` | `notFound()` → 404 page |
| Empty filter results | Empty state: "No users match your filters" |
| Long names/content | CSS `truncate` + `title` attribute |
| Slow list load | Skeleton cards via `loading.tsx` |
| Slow detail load | `loading.tsx` skeleton |

## Testing Strategy (TDD)

Write test → red → implement → green → next test.
All network calls mocked via `jest.fn()` or MSW.

### Components to test
- `user-list.tsx` — renders activity signals, search filter, sort, additional filter, loading/error/empty states
- `user-card.tsx` — renders name, email, badges correctly
- `profile-sidebar.tsx` — renders all user fields
- `posts-panel.tsx` — renders posts list, handles empty state
- `todos-summary.tsx` — renders done/pending counts

### Services to test
- `getUsers.ts` — fetch called with correct URL, returns typed data
- `getUserById.ts` — handles 404 response
- `useGetUsers` — passes correct key + fetcher to `useQuery`
