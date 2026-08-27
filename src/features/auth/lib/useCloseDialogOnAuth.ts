import { useEffect } from 'react'

import { useAuthDialogContext } from '../model/AuthDialogContext'

export function useCloseDialogOnAuth(isAuth: boolean) {
  const { closeAuthDialog } = useAuthDialogContext()

  useEffect(() => {
    if (isAuth) closeAuthDialog()
  }, [isAuth, closeAuthDialog])
}
