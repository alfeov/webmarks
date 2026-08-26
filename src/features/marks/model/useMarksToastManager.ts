import { useEffect } from 'react'

import { showErrorToast } from '@/shared/utils/showErrorToast'
import { showSuccessToast } from '@/shared/utils/showSuccessToast'

export function useMarksToastManager(
  message: string | null,
  isSuccess: boolean,
) {
  useEffect(() => {
    if (message) {
      if (isSuccess) {
        showSuccessToast(message)
        return
      }
      showErrorToast(message)
    }
  }, [message, isSuccess])
}
