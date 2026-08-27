'use client'

import { useAuthDialogActionsContext } from '@/features/auth/model/AuthDialogContext'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

export function LoginMenuItem() {
  const authDialogActions = useAuthDialogActionsContext()

  return (
    <DropdownMenuItem onClick={authDialogActions.openLoginDialog}>
      Login
    </DropdownMenuItem>
  )
}
