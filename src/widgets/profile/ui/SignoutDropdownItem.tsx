import { useLocale, useTranslations } from 'next-intl'

import { signoutAction } from '@/features/signout/api/signoutAction'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

export function SignoutDropdownItem() {
  const locale = useLocale()

  const t = useTranslations('ProfileDropdownMenu')

  return (
    <DropdownMenuItem
      variant='destructive'
      onClick={signoutAction.bind(null, locale)}
    >
      {t('items.signout')}
    </DropdownMenuItem>
  )
}
