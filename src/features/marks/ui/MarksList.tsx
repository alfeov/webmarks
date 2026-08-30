import { MarkItem } from '@/features/marks/ui/MarkItem'
import { verifySession } from '@/shared/lib/session'
import { ErrorEmpty } from '@/shared/ui/ErrorEmpty'

import { getAllMarks } from '../api/getAllMarks'
import { getMarksByTag } from '../api/getMarksByTag'
import { MarksGrid } from './MarksGrid'

export async function MarksList({ tagTitle }: { tagTitle?: string }) {
  const session = await verifySession()
  const { marks, message } = tagTitle
    ? await getMarksByTag({ userId: session?.userId, tagTitle })
    : await getAllMarks({
        userId: session?.userId,
      })

  return (
    <div className='h-full'>
      {Boolean(marks.length) ? (
        <MarksGrid>
          {marks.map((mark) => (
            <MarkItem key={mark.id} {...mark} />
          ))}
        </MarksGrid>
      ) : (
        <ErrorEmpty>{message}</ErrorEmpty>
      )}
    </div>
  )
}
