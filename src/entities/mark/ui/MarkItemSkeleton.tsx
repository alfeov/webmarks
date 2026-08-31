import { AvatarSkeleton } from '@/shared/ui/AvatarSkeleton'
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/card'
import { Skeleton } from '@/shared/ui/skeleton'

export function MarkItemSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center gap-[10px]'>
          <AvatarSkeleton size='lg' />
          <div className='grow grid gap-[10px]'>
            <Skeleton className='h-4 w-3/4' />
            <Skeleton className='h-4 w-2/3' />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className='aspect-video w-full' />
      </CardContent>
      <CardFooter>
        <div className='flex flex-wrap gap-[10px]'>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className='rounded-3xl h-5 w-20' />
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}
