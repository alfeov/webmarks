import { useEffect } from 'react'

import { useAuthDialogActionsContext } from '../model/AuthDialogContext'

export function useCloseDialogOnAuth(isAuth: boolean) {
  const authDialogActions = useAuthDialogActionsContext()

  useEffect(() => {
    if (isAuth) authDialogActions.closeAuthDialog()
  }, [isAuth, authDialogActions])
}
