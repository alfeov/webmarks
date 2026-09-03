import { Suspense } from 'react'

import { CreateMarkButton } from '@/features/create-mark/ui/CreateMarkButton'
import { SearchMark } from '@/features/search-mark/ui/SearchMark'
import { Tag } from '@/shared/lib/prisma/generated/client'

import { MarkList } from './MarkList'
import { MarksListSkeleton } from './MarkListSkeleton'

interface MarksProps {
  params?: Promise<{
    tagId: Tag['id']
  }>
  searchParams?: Promise<{
    query?: string | string[]
  }>
}

export async function Marks({ params, searchParams }: MarksProps) {
  return (
    <div className='p-[30px] flex flex-col gap-[30px] h-full'>
      <div className='flex justify-between'>
        <SearchMark />
        <CreateMarkButton />
      </div>
      <Suspense fallback={<MarksListSkeleton />}>
        <MarkList params={params} searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
