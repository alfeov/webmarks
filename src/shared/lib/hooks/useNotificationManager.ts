import { useEffect } from 'react'

import { showErrorToast } from '@/shared/lib/utils/showErrorToast'
import { showSuccessToast } from '@/shared/lib/utils/showSuccessToast'

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
