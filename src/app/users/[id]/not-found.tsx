import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center p-6">
      <h2 className="text-2xl font-bold">User Not Found</h2>
      <p className="text-muted-foreground">That user ID doesn't exist.</p>
      <Button variant="outline">
        <Link href="/users">Back to users</Link>
      </Button>
    </div>
  )
}
