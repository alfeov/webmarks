'use client'

import { createContext, use, useState } from 'react'

import { AuthDialog } from '../ui/AuthDialog'

type AuthDialogContextValue = {
  mode: 'closed' | 'login' | 'signup'
  closeAuthDialog: () => void
  openLoginDialog: () => void
  openSignupDialog: () => void
}

const AuthDialogContext = createContext<null | AuthDialogContextValue>(null)

export function AuthDialogProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [authDialog, setAuthDialog] =
    useState<AuthDialogContextValue['mode']>('closed')

  const closeAuthDialog = () => setAuthDialog('closed')
  const openLoginDialog = () => setAuthDialog('login')
  const openSignupDialog = () => setAuthDialog('signup')

  return (
    <AuthDialogContext
      value={{
        mode: authDialog,
        closeAuthDialog,
        openLoginDialog,
        openSignupDialog,
      }}
    >
      <AuthDialog />
      {children}
    </AuthDialogContext>
  )
}

export function useAuthDialogContext() {
  const authDialog = use(AuthDialogContext)
  if (!authDialog)
    throw new Error(
      'Component must be wrapped in ContextProvider to use this hook',
    )

  return authDialog
}
