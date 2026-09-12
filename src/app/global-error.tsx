'use client'

import localFont from 'next/font/local'
import { useEffect } from 'react'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { ErrorEmpty } from '@/shared/ui/ErrorEmpty'

import './styles/index.css'

const fontExcalidraw = localFont({
  src: '../shared/assets/fonts/Excalifont-Regular.woff2',
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
        <ErrorEmpty>
          <div className='grid gap-[10px]'>
            App has been down...
            <Button onClick={retry}>Retry</Button>
          </div>
        </ErrorEmpty>
      </body>
    </html>
  )
}
