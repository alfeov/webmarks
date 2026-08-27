'use client'

import { createContext, useState } from 'react'

import { AuthDialog } from '../ui/AuthDialog'

type AuthDialogState = 'close' | 'login' | 'signup'
type AuthDialogSetters = {
  closeAuthDialog: () => void
  openLoginDialog: () => void
  openSignupDialog: () => void
}

export const AuthDialogStateContext = createContext<AuthDialogState>('close')
export const AuthDialogSettersContext = createContext<null | AuthDialogSetters>(
  null,
)

export function AuthDialogProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [authDialog, setAuthDialog] = useState<AuthDialogState>('close')

  const closeAuthDialog = () => setAuthDialog('close')
  const openLoginDialog = () => setAuthDialog('login')
  const openSignupDialog = () => setAuthDialog('signup')

  return (
    <AuthDialogStateContext value={authDialog}>
      <AuthDialogSettersContext
        value={{ closeAuthDialog, openLoginDialog, openSignupDialog }}
      >
        <AuthDialog />
        {children}
      </AuthDialogSettersContext>
    </AuthDialogStateContext>
  )
}
