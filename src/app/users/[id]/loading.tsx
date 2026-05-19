import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Skeleton className="h-4 w-24 mb-6" />
      <div className="flex flex-col lg:flex-row gap-6 mt-4">
        <Skeleton className="w-full lg:w-72 h-96 rounded-lg" />
        <div className="flex-1 flex flex-col gap-3">
          <Skeleton className="h-8 w-32" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}
