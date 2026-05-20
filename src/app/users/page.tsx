import { Suspense } from 'react'
import { UserList } from '@/components/users/user-list'
import { UserListSkeleton } from '@/components/users/skeletons'

export default function UsersPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      <Suspense fallback={<UserListSkeleton />}>
        <UserList />
      </Suspense>
    </div>
  )
}
