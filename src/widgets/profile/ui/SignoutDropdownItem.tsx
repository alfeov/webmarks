import { useLocale, useTranslations } from 'next-intl'

import { signoutAction } from '@/features/signout/api/signoutAction'
import { TEST_IDS } from '@/shared/config/testids'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

export function SignoutDropdownItem() {
  const locale = useLocale()

  const t = useTranslations('ProfileDropdownMenu')

  return (
    <DropdownMenuItem
      variant='destructive'
      onClick={signoutAction.bind(null, locale)}
      data-testid={TEST_IDS.CLICKABLE.BUTTON.LOGOUT}
    >
      {t('items.signout')}
    </DropdownMenuItem>
  )
}
