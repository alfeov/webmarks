import { Suspense } from 'react'

import { CreateMarkButton } from '@/features/create-mark/ui/CreateMarkButton'
import { SearchMark } from '@/features/search-mark/ui/SearchMark'
import { SearchMarkSkeleton } from '@/features/search-mark/ui/SearchMarkSkeleton'
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
  let tagId = undefined
  if (params) {
    const resolvedParams = await params
    tagId = resolvedParams.tagId
  }
  let query = undefined
  if (searchParams) {
    const resolvedSearchParams = await searchParams
    query = Array.isArray(resolvedSearchParams.query)
      ? resolvedSearchParams.query[0]
      : resolvedSearchParams.query
  }

  return (
    <div className='p-[30px] flex flex-col gap-[30px] h-full'>
      <div className='flex justify-between'>
        <Suspense fallback={<SearchMarkSkeleton />}>
          <SearchMark />
        </Suspense>
        <CreateMarkButton />
      </div>
      <Suspense fallback={<MarksListSkeleton />}>
        <MarkList tagId={tagId} query={query} />
      </Suspense>
    </div>
  )
}
