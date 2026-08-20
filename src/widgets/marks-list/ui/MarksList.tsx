import { CreateMark } from '@/features/marks/ui/CreateMark'
import { MarkItem } from '@/features/marks/ui/MarkItem'
import { SearchMark } from '@/features/marks/ui/SearchMark'
import { marks } from '@/shared/mock/marks'

export function MarksList() {
  return (
    <div className='p-[30px] flex flex-col gap-[30px]'>
      <div className='flex justify-between'>
        <SearchMark />
        <CreateMark />
      </div>
      <div className='grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-[30px]  content-start'>
        {marks.map((mark) => (
          <MarkItem key={mark.url} {...mark} />
        ))}
      </div>
    </div>
  )
}
