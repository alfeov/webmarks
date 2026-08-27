'use client'

import { useAuthDialogActionsContext } from '@/features/auth/model/AuthDialogContext'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

export function SignupMenuItem() {
  const authDialogActions = useAuthDialogActionsContext()

  return (
    <DropdownMenuItem onClick={authDialogActions.openSignupDialog}>
      Signup
    </DropdownMenuItem>
  )
}
