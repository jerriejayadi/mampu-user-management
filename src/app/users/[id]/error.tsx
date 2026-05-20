'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function UserDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center p-6">
      <h2 className="text-2xl font-bold">Failed to load user</h2>
      <p className="text-muted-foreground text-sm">{error.message || 'An unexpected error occurred.'}</p>
      <div className="flex gap-3">
        <Button variant="outline" onClick={reset}>
          Try again
        </Button>
        <Button variant="ghost">
          <Link href="/users">Back to list</Link>
        </Button>
      </div>
    </div>
  )
}
