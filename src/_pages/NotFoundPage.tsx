import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/shared/ui/empty'

import { CircleX } from 'lucide-react'

export function NotFoundPage() {
  return (
    <Empty className='h-full'>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <CircleX className='size-6' />
        </EmptyMedia>
        <EmptyTitle>404 - Not Found</EmptyTitle>
        <EmptyDescription>
          Page with you&apos;re looking for doesn&apos;t exist.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
