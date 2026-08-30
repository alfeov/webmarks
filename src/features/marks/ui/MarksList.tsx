import { MarkItem } from '@/features/marks/ui/MarkItem'
import { verifySession } from '@/shared/lib/session'
import { ErrorEmpty } from '@/shared/ui/ErrorEmpty'

import { getAllMarks } from '../api/getAllMarks'
import { getMarksByTag } from '../api/getMarksByTag'

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
        <div className='grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-[30px] content-start'>
          {marks.map((mark) => (
            <MarkItem key={mark.id} {...mark} />
          ))}
        </div>
      ) : (
        <ErrorEmpty>{message}</ErrorEmpty>
      )}
    </div>
  )
}
