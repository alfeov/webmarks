'use client'

import { use } from 'react'

import { AuthDialogSettersContext } from '@/features/auth/model/AuthDialogContext'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

export function LoginMenuItem() {
  const setters = use(AuthDialogSettersContext)

  return (
    <DropdownMenuItem onClick={setters?.openLoginDialog}>
      Login
    </DropdownMenuItem>
  )
}
