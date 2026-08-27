'use client'

import { useAuthDialogContext } from '@/features/auth/model/AuthDialogContext'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

export function SignupMenuItem() {
  const { openSignupDialog } = useAuthDialogContext()

  return <DropdownMenuItem onClick={openSignupDialog}>Signup</DropdownMenuItem>
}
