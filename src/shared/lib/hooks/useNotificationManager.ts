import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

import { MessageCode } from '@/shared/api/types'

import { showToast } from '../utils/showToast'

export function useNotificationManager(
  messageCode: MessageCode | null = null,
  isSuccess: boolean,
  notificationTrigger: boolean,
) {
  const t = useTranslations('codes')

  useEffect(() => {
    if (notificationTrigger) {
      if (messageCode) {
        const message = t(messageCode) || t('UNKNOWN_ERROR')
        showToast(message, isSuccess)
      }
    }
  }, [notificationTrigger])
}
