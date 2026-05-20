# Mampu User Management

A submission for mampu.io Frontend Engineer Technical Test: A user management system that displays user lists, user details, and activities (Posts, Todos).

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4, shadcn/ui (base-nova)
- **Data Fetching:** native `fetch` + SWR
- **Testing:** Jest + React Testing Library
- **Theme:** next-themes (dark/light/system)
- **AI Assistant:** Claude (Anthropic) — used for design, planning, and implementation via Claude Code

## Getting Started

```bash
# Install dependencies
npm ci

# Development
npm run dev

# Production
npm run build && npm start
```

## Running Tests

```bash
npm test                    # Run unit tests (Jest + RTL)
npm test -- --coverage      # Run with coverage report
npm run e2e                 # Run E2E tests (Playwright, requires build)
npm run e2e:ui              # Playwright UI mode
```

Unit tests: 28 tests across 8 suites, ~94% coverage.
E2E tests: 27 tests covering list, navigation, user detail, not-found, and theme toggle.

## Features

### User List (`/users`)
- Compact list view with activity signals (posts count, done/pending todos)
- Debounced search by name or email (300ms auto + Enter/icon for instant)
- Sort by name, email, or most pending todos
- Filter by todo status (all, has pending, no completed)
- URL-synced filters — navigate to detail and back without losing state

### User Detail (`/users/[id]`)
- Server Component with `generateMetadata` for dynamic page titles
- Profile sidebar: contact info, company, address
- Tabbed content panel (Posts / Todos) with "Show more" pagination
- Todos tab includes summary counts + full checklist with status indicators
- Parallel data fetching with `Promise.all`
- 404 handling for invalid user IDs

### UI/UX
- Dark/light theme toggle with system preference default
- Sticky icon-rail sidebar navigation
- Responsive layout (mobile-friendly)
- Loading skeletons for perceived performance

## Architecture Decisions

- **Service layer pattern:** Each resource has a pure fetch function (`getUsers.ts`) and a separate SWR hook (`useGetUsers.ts`). Fetch functions are server-safe (no SWR import), hooks are `'use client'` only. This avoids RSC bundling issues with SWR's `react-server` module.
- **Client-side filtering:** JSONPlaceholder has no query params for search/filter/sort. All data is fetched once, cached by SWR (`dedupingInterval: 60s`), and filtered in `useMemo`.
- **URL state sync:** Search, sort, and filter state stored in URL search params via `useSearchParams`. Local `useState` drives the UI for instant response; a `useEffect` syncs to URL for back-navigation preservation.
- **ISR (Incremental Static Regeneration):** Server-side fetches on the detail page use `{ next: { revalidate: 60 } }` — responses are cached and revalidated every 60 seconds. Subsequent visits serve from cache until stale.
- **Server vs Client Components:** User detail page is a Server Component (SEO, parallel fetch, ISR). User list page is a Client Component (interactive filters, SWR real-time cache).
- **TDD approach:** Components built test-first with Jest + React Testing Library.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout — sidebar + theme provider
│   ├── page.tsx                # Redirect → /users
│   └── users/
│       ├── page.tsx            # User list page (client)
│       ├── loading.tsx         # List skeleton
│       └── [id]/
│           ├── page.tsx        # User detail (server component)
│           ├── loading.tsx     # Detail skeleton
│           └── not-found.tsx   # 404 page
├── components/
│   ├── ui/                     # shadcn atoms (button, input, badge, etc.)
│   ├── sidebar.tsx             # Icon rail nav + theme toggle
│   ├── theme-provider.tsx      # next-themes wrapper
│   ├── users/                  # User list components
│   └── user-detail/            # User detail components
├── services/                   # Fetch functions + SWR hooks per resource
├── hooks/                      # Custom hooks (useDebounce)
├── lib/                        # SWR base config, cn utility
└── types/                      # TypeScript interfaces
```

## Future Improvements

- Mobile filter drawer for compact filter UX
- Server-side search/pagination if API supports it
- Virtualized lists (react-virtual) for large datasets
- Error Boundary for user detail route
- `generateStaticParams` for full SSG on detail pages
