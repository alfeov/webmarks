import { use, useEffect } from 'react'

import { showErrorToast } from '@/shared/utils/showErrorToast'
import { showSuccessToast } from '@/shared/utils/showSuccessToast'

import { AuthDialogSettersContext } from './AuthDialogContext'

export function useAuthToastManager(
  message: string | undefined,
  isSuccess: boolean | undefined,
) {
  const authDialogSetters = use(AuthDialogSettersContext)

  useEffect(() => {
    if (message) {
      if (isSuccess) {
        showSuccessToast(message)
        authDialogSetters?.closeAuthDialog()
        return
      }
      showErrorToast(message)
    }
  }, [message, isSuccess, authDialogSetters])
}
