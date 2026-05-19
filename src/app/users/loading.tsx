import { UserListSkeleton } from '@/components/users/skeletons'

export default function Loading() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="h-8 w-24 bg-muted rounded mb-6 animate-pulse" />
      <UserListSkeleton />
    </div>
  )
}
