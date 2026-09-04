import { useEffect } from 'react'

import { showToast } from '../utils/showToast'

export function useNotificationManager(
  message: string | null,
  isSuccess: boolean,
  notificationTrigger: boolean,
) {
  useEffect(() => {
    if (notificationTrigger) {
      if (message) {
        showToast(message, isSuccess)
      }
    }
  }, [message, isSuccess, notificationTrigger])
}
