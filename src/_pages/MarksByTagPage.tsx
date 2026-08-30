import { Suspense } from 'react'

import { FullSkeleton } from '@/shared/ui/FullSkeleton'
import { Marks } from '@/widgets/marks/ui/Marks'

export async function MarksByTagPage({ params }: PageProps<'/[tag]'>) {
  return (
    <Suspense fallback={<FullSkeleton />}>
      <Marks params={params} />
    </Suspense>
  )
}
