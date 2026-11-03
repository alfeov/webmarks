'use client'

import { useTranslations } from 'next-intl'

import { TEST_IDS } from '@/shared/config/testids'
import { useDialogContext } from '@/shared/lib/contexts/DialogContext'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'
import { Auth } from '@/widgets/auth/ui/Auth'

export function SigninDropdownItem() {
  const { openDialog } = useDialogContext()

  const t = useTranslations('ProfileDropdownMenu')

  return (
    <DropdownMenuItem
      onClick={() => openDialog(<Auth initialMode='signin' />)}
      data-testid={TEST_IDS.CLICKABLE.BUTTON.SIGNIN}
    >
      {t('items.signin')}
    </DropdownMenuItem>
  )
}
