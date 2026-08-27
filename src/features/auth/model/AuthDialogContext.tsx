'use client'

import { createContext, use, useState } from 'react'

import { AuthDialog } from '../ui/AuthDialog'

type AuthDialogState = 'close' | 'login' | 'signup'
type AuthDialogActions = {
  closeAuthDialog: () => void
  openLoginDialog: () => void
  openSignupDialog: () => void
}

const AuthDialogStateContext = createContext<null | AuthDialogState>(null)
const AuthDialogActionsContext = createContext<null | AuthDialogActions>(null)

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
      <AuthDialogActionsContext
        value={{ closeAuthDialog, openLoginDialog, openSignupDialog }}
      >
        <AuthDialog />
        {children}
      </AuthDialogActionsContext>
    </AuthDialogStateContext>
  )
}

export function useAuthDialogStateContext() {
  const authDialogState = use(AuthDialogStateContext)
  if (!authDialogState)
    throw new Error(
      'Component must be wrapped in ContextProvider to use this hook',
    )

  return authDialogState
}

export function useAuthDialogActionsContext() {
  const authDialogActions = use(AuthDialogActionsContext)
  if (!authDialogActions)
    throw new Error(
      'Component must be wrapped in ContextProvider to use this hook',
    )

  return authDialogActions
}
