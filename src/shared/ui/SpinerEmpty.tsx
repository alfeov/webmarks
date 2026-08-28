import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/shared/ui/empty'
import { Spinner } from '@/shared/ui/spinner'

export function SpinnerEmpty({ children }: { children: React.ReactNode }) {
  return (
    <Empty className='w-full'>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <Spinner className='size-6' />
        </EmptyMedia>
        <EmptyTitle>Loading</EmptyTitle>
        <EmptyDescription>{children}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
