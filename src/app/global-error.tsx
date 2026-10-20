'use client'

import localFont from 'next/font/local'
import { useEffect } from 'react'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/shared/ui/empty'

import './styles/index.css'
import { FaceSlightlyFrowning } from 'lucide-react'

const fontExcalidraw = localFont({
  src: './Excalifont-Regular.woff2',
  display: 'swap',
  variable: '--font-excalifont',
})

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html
      lang='en'
      className={cn('h-full', 'antialiased', fontExcalidraw.variable)}
      data-scroll-behavior='smooth'
    >
      <body className='flex min-h-full flex-col'>
        <Empty className='h-full'>
          <EmptyHeader>
            <EmptyMedia variant='icon'>
              <FaceSlightlyFrowning />
            </EmptyMedia>
            <EmptyTitle>Something went wrong</EmptyTitle>
            <EmptyDescription>App has been down...</EmptyDescription>
            <EmptyContent>
              <Button onClick={retry} className='w-full'>
                Retry
              </Button>
            </EmptyContent>
          </EmptyHeader>
        </Empty>
      </body>
    </html>
  )
}
