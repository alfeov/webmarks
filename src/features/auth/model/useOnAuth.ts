import { use, useEffect } from 'react'

import { AuthDialogSettersContext } from './AuthDialogContext'

export function useOnAuth(isAuth: boolean) {
  const authDialogSetters = use(AuthDialogSettersContext)

  useEffect(() => {
    if (isAuth) authDialogSetters?.closeAuthDialog()
  }, [isAuth, authDialogSetters])
}
