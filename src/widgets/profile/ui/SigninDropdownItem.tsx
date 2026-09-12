'use client'

import { useDialogContext } from '@/shared/lib/contexts/DialogContext'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'
import { Auth } from '@/widgets/auth/ui/Auth'

export function LoginDropdownItem() {
  const { openDialog } = useDialogContext()

  return (
    <DropdownMenuItem onClick={() => openDialog(<Auth initialMode='signin' />)}>
      Login
    </DropdownMenuItem>
  )
}
