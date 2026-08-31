import { Suspense } from 'react'

import { CreateMarkDialog } from '@/features/create-mark/ui/CreateMarkDialog'
import { SearchMark } from '@/features/search-mark/ui/SearchMark'
import { SearchMarkSkeleton } from '@/features/search-mark/ui/SearchMarkSkeleton'

import { MarkList } from './MarkList'
import { MarksListSkeleton } from './MarkListSkeleton'

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
        <CreateMarkDialog />
      </div>
      <Suspense fallback={<MarksListSkeleton />}>
        <MarkList tag={tag} />
      </Suspense>
    </div>
  )
}
