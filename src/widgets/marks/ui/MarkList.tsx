import { getAllUserMarks } from '@/entities/mark/api/getAllUserMarks'
import { getMarksByTag } from '@/entities/mark/api/getMarksByTag'
import { MarkItem } from '@/entities/mark/ui/MarkItem'
import { Tag } from '@/shared/lib/prisma/generated/client'
import { verifySession } from '@/shared/lib/session'
import { ErrorEmpty } from '@/shared/ui/ErrorEmpty'

import { MarkDropdownMenu } from './MarkDropdownMenu'
import { MarkGrid } from './MarkGrid'

export async function MarkList({ tagId }: { tagId?: Tag['id'] }) {
  const session = await verifySession()
  const { marks, message } = tagId
    ? await getMarksByTag({ userId: session?.userId, tagId })
    : await getAllUserMarks({
        userId: session?.userId,
      })

  return (
    <div className='h-full'>
      {Boolean(marks.length) ? (
        <MarkGrid>
          {marks.map((mark) => (
            <MarkItem key={mark.id} {...mark}>
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
