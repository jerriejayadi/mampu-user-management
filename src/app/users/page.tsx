'use client'

import { UserList } from '@/components/users/user-list'

export default function UsersPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      <UserList />
    </div>
  )
}
