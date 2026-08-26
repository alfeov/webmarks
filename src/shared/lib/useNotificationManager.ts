import { useEffect } from 'react'

import { showErrorToast } from '@/shared/utils/showErrorToast'
import { showSuccessToast } from '@/shared/utils/showSuccessToast'

export function useNotificationManager(
  message: string | null,
  isSuccess: boolean,
) {
  useEffect(() => {
    if (message) {
      const toastId = isSuccess
        ? showSuccessToast(message)
        : showErrorToast(message)
    }
  }, [message, isSuccess])
}
