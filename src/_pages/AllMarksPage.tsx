import { Suspense } from 'react'

import { Marks } from '@/widgets/marks/ui/Marks'

export function AllMarksPage({ searchParams }: PageProps<'/'>) {
  return (
    <Suspense>
      <Marks searchParams={searchParams} />
    </Suspense>
  )
}
