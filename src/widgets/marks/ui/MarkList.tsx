import { getAllUserMarks } from '@/entities/mark/api/getAllUserMarks'
import { getMarksByTag } from '@/entities/mark/api/getMarksByTag'
import { MarkItem } from '@/entities/mark/ui/MarkItem'
import { verifySession } from '@/shared/lib/session'
import { ErrorEmpty } from '@/shared/ui/ErrorEmpty'

import { MarkDropdownMenu } from './MarkDropdownMenu'
import { MarkGrid } from './MarkGrid'

export async function MarkList({ tag }: { tag?: string }) {
  const session = await verifySession()
  const { marks, message } = tag
    ? await getMarksByTag({ userId: session?.userId, tagTitle: tag })
    : await getAllUserMarks({
        userId: session?.userId,
      })

  return (
    <div className='h-full'>
      {Boolean(marks.length) ? (
        <MarkGrid>
          {marks.map((mark) => (
            <MarkItem key={mark.id} {...mark}>
              <MarkDropdownMenu pinned={mark.pinned} tags={mark.tags} />
            </MarkItem>
          ))}
        </MarkGrid>
      ) : (
        <ErrorEmpty>{message}</ErrorEmpty>
      )}
    </div>
  )
}
