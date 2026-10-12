'use client'

import { createContext, useCallback, useMemo, useState } from 'react'

import { FetchingIndicator } from '@/shared/ui/FetchingIndicator'

import { createUseContextHook } from '../utils/createUseContextHook'

type FetchingIndicatorContextValue = {
  showFetchingIndicator: () => void
  hideFetchingIndicator: () => void
}

const FetchingIndicatorContext =
  createContext<FetchingIndicatorContextValue | null>(null)

export function FetchingIndicatorProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isShown, setIsShown] = useState(false)

  const showFetchingIndicator = useCallback(() => setIsShown(true), [])
  const hideFetchingIndicator = useCallback(() => setIsShown(false), [])

  const value = useMemo(
    () => ({ showFetchingIndicator, hideFetchingIndicator }),
    [showFetchingIndicator, hideFetchingIndicator],
  )

  return (
    <FetchingIndicatorContext value={value}>
      {children}
      <FetchingIndicator condition={isShown} />
    </FetchingIndicatorContext>
  )
}

export const useFetchingIndicatorContext = createUseContextHook(
  FetchingIndicatorContext,
)
