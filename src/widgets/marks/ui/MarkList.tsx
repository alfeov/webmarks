import { getUserMarks } from '@/entities/mark/api/getUserMarks'
import { MarkItem } from '@/entities/mark/ui/MarkItem'
import { Tag } from '@/shared/lib/prisma/generated/client'
import { verifySession } from '@/shared/lib/session'
import { ErrorEmpty } from '@/shared/ui/ErrorEmpty'

import { MarkDropdownMenu } from '../../../features/manage-mark/ui/MarkDropdownMenu'
import { MarkGrid } from './MarkGrid'

interface MarkListProps {
  params?: Promise<{
    tagId: Tag['id']
  }>
  searchParams?: Promise<{
    query?: string | string[]
  }>
}

export async function MarkList({ params, searchParams }: MarkListProps) {
  const tagId = (await params)?.tagId
  const query = (await searchParams)?.query

  const session = await verifySession()
  const { marks, message } = await getUserMarks({
    tagId,
    query: Array.isArray(query) ? query[0] : query,
    userId: session?.userId,
  })

  return (
    <div className='h-full'>
      {Boolean(marks.length) ? (
        <MarkGrid>
          {marks.map((mark) => (
            <MarkItem key={`${mark.id}-${mark.updatedAt}`} {...mark}>
              <MarkDropdownMenu {...mark} />
            </MarkItem>
          ))}
        </MarkGrid>
      ) : (
        <ErrorEmpty>{message}</ErrorEmpty>
      )}
    </div>
  )
}
