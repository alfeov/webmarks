'use client'

import { useAuthDialogContext } from '@/features/auth/model/AuthDialogContext'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

export function LoginMenuItem() {
  const { openLoginDialog } = useAuthDialogContext()

  return <DropdownMenuItem onClick={openLoginDialog}>Login</DropdownMenuItem>
}
