import { use, useEffect } from 'react'

import { AuthDialogSettersContext } from '../model/AuthDialogContext'

export function useCloseDialogOnAuth(isAuth: boolean) {
  const authDialogSetters = use(AuthDialogSettersContext)

  useEffect(() => {
    if (isAuth) authDialogSetters?.closeAuthDialog()
  }, [isAuth, authDialogSetters])
}
