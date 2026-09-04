'use client'

import { createContext, useState } from 'react'

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

  const showFetchingIndicator = () => setIsShown(true)
  const hideFetchingIndicator = () => setIsShown(false)

  return (
    <FetchingIndicatorContext
      value={{ showFetchingIndicator, hideFetchingIndicator }}
    >
      {children}
      <FetchingIndicator condition={isShown} />
    </FetchingIndicatorContext>
  )
}

export const useFetchingIndicatorContext = createUseContextHook(
  FetchingIndicatorContext,
)
