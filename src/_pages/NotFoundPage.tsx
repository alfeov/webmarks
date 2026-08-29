'use client'

import { usePathname } from 'next/navigation'

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/shared/ui/empty'

import { CircleX } from 'lucide-react'

export function NotFoundPage() {
  const pathname = usePathname()

  return (
    <Empty className='h-full'>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <CircleX className='size-6' />
        </EmptyMedia>
        <EmptyTitle>404 - Not Found</EmptyTitle>
        <EmptyDescription>
          Page with path {pathname} you&apos;re looking for doesn&apos;t exist.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
