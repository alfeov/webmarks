import { useEffect } from 'react'

import { useFetchingIndicatorContext } from '../contexts/FetchingIndicatorContext'

const hidingDelay = 1000

export function useFetchingIndicatorManager(condition: boolean) {
  const { showFetchingIndicator, hideFetchingIndicator } =
    useFetchingIndicatorContext()

  useEffect(() => {
    if (condition) showFetchingIndicator()

    return () => {
      setTimeout(hideFetchingIndicator, hidingDelay)
    }
  }, [condition, showFetchingIndicator, hideFetchingIndicator])
}
