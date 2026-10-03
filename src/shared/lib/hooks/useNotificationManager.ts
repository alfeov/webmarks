import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

import { MessageCode } from '@/shared/api/types'

import { showToast } from '../utils/showToast'

export function useNotificationManager(
  messageCode: MessageCode | null = null,
  isSuccess: boolean,
  notificationTrigger: boolean,
) {
  const tToast = useTranslations('toast')
  const tCodes = useTranslations('codes')

  useEffect(() => {
    if (notificationTrigger) {
      if (messageCode) {
        const title = isSuccess ? tToast('successTitle') : tToast('errorTitle')
        const message = tCodes(messageCode) || tCodes('UNKNOWN_ERROR')
        showToast(title, message, isSuccess)
      }
    }
  }, [notificationTrigger])
}
