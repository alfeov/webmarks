import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/shared/ui/empty'

import { FaceSlightlyFrowning } from 'lucide-react'

interface ErrorEmptyProps {
  title: string
  description: string
  children?: React.ReactNode
}

export function ErrorEmpty({ title, description, children }: ErrorEmptyProps) {
  return (
    <Empty className='h-full'>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <FaceSlightlyFrowning />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
        <EmptyContent>{children}</EmptyContent>
      </EmptyHeader>
    </Empty>
  )
}
