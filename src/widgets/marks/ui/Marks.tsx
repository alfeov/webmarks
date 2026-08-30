import { CreateMark } from '@/features/marks/ui/CreateMark'
import { MarksList } from '@/features/marks/ui/MarksList'
import { SearchMark } from '@/features/marks/ui/SearchMark'

export async function Marks({ tagTitle }: { tagTitle?: string }) {
  return (
    <div className='p-[30px] flex flex-col gap-[30px] h-full'>
      <div className='flex justify-between'>
        <SearchMark />
        <CreateMark />
      </div>
      <MarksList tagTitle={tagTitle} />
    </div>
  )
}
