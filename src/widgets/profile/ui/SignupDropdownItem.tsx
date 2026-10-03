'use client'

import { useTranslations } from 'next-intl'

import { useDialogContext } from '@/shared/lib/contexts/DialogContext'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'
import { Auth } from '@/widgets/auth/ui/Auth'

export function SignupDropdownItem() {
  const { openDialog } = useDialogContext()

  const t = useTranslations('ProfileDropdownMenu')

  return (
    <DropdownMenuItem onClick={() => openDialog(<Auth initialMode='signup' />)}>
      {t('items.signup')}
    </DropdownMenuItem>
  )
}
