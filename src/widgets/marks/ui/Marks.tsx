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
    <div className='flex h-full flex-col gap-[30px] p-[30px]'>
      <div className='flex flex-col-reverse justify-between gap-[15px] sm:flex-row'>
        <SearchMark />
        <CreateMarkButton />
      </div>
      <Suspense fallback={<MarksListSkeleton />}>
        <MarkList params={params} searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
