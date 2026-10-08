import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

import type { MessageCode } from '@/shared/api/types'
import { showToast } from '@/shared/lib/utils/showToast'

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
        const message = tCodes(messageCode)
        showToast(title, message, isSuccess)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationTrigger, messageCode])
}
