import { Suspense } from 'react'

import { CreateMark } from '@/features/marks/ui/CreateMark'
import { MarksList } from '@/features/marks/ui/MarksList'
import { MarksListSkeleton } from '@/features/marks/ui/MarksListSkeleton'
import { SearchMark } from '@/features/marks/ui/SearchMark'
import { SearchMarkSkeleton } from '@/features/marks/ui/SearchMarkSkeleton'

interface MarksProps {
  params?: Promise<{
    tag: string
  }>
}

export async function Marks({ params }: MarksProps) {
  let tag = undefined
  if (params) {
    const resolvedParams = await params
    tag = resolvedParams.tag
  }

  return (
    <div className='p-[30px] flex flex-col gap-[30px] h-full'>
      <div className='flex justify-between'>
        <Suspense fallback={<SearchMarkSkeleton />}>
          <SearchMark />
        </Suspense>
        <CreateMark />
      </div>
      <Suspense fallback={<MarksListSkeleton />}>
        <MarksList tag={tag} />
      </Suspense>
    </div>
  )
}
