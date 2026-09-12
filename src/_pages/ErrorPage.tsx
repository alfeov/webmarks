'use client'

import { useEffect } from 'react'

import { Button } from '@/shared/ui/button'
import { ErrorEmpty } from '@/shared/ui/ErrorEmpty'

export function ErrorPage({
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
    <ErrorEmpty>
      App has been down...
      <Button onClick={retry}>Retry</Button>
    </ErrorEmpty>
  )
}
