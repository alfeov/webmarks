import { getUserMarks } from '@/entities/mark/api/getUserMarks'
import { MarkItem } from '@/entities/mark/ui/MarkItem'
import { Tag } from '@/shared/lib/prisma/generated/client'
import { verifySession } from '@/shared/lib/session'
import { ErrorEmpty } from '@/shared/ui/ErrorEmpty'

import { MarkDropdownMenu } from './MarkDropdownMenu'
import { MarkGrid } from './MarkGrid'

interface MarkListProps {
  tagId?: Tag['id']
  query?: string
}

export async function MarkList({ query, tagId }: MarkListProps) {
  const session = await verifySession()
  const { marks, message } = await getUserMarks({
    query,
    userId: session?.userId,
    tagId,
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
