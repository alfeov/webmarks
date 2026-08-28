import { loadMarks } from '@/features/marks/api/loadMarks'
import { CreateMark } from '@/features/marks/ui/CreateMark'
import { MarkItem } from '@/features/marks/ui/MarkItem'
import { SearchMark } from '@/features/marks/ui/SearchMark'
import { ErrorEmpty } from '@/shared/ui/ErrorEmpty'

export async function MarksList() {
  const { marks, message } = await loadMarks()

  return (
    <div className='p-[30px] flex flex-col gap-[30px] h-full'>
      <div className='flex justify-between'>
        <SearchMark />
        <CreateMark />
      </div>
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
    </div>
  )
}
