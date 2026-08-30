import { Suspense } from 'react'

import { Marks } from '@/widgets/marks/ui/Marks'

export async function MarksByTagPage({ params }: PageProps<'/[tag]'>) {
  return (
    <Suspense>
      <Marks params={params} />
    </Suspense>
  )
}
