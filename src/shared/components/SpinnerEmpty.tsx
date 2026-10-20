import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/shared/ui/empty'
import { Spinner } from '@/shared/ui/spinner'

interface SpinnerEmptyProps {
  title: string
  description: string
}

export function SpinnerEmpty({ title, description }: SpinnerEmptyProps) {
  return (
    <Empty className='h-full w-full'>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <Spinner className='size-6' />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
