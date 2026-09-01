import { Suspense } from 'react'

import { Marks } from '@/widgets/marks/ui/Marks'

export async function MarksByTagPage({
  params,
  searchParams,
}: PageProps<'/[tagId]'>) {
  return (
    <Suspense>
      <Marks params={params} searchParams={searchParams} />
    </Suspense>
  )
}
