import { Skeleton } from '@/components/ui/skeleton'

export function UserListSkeleton() {
  return (
    <div data-testid="user-list-skeleton" className="flex flex-col gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-20 w-full rounded-lg" />
      ))}
    </div>
  )
}
