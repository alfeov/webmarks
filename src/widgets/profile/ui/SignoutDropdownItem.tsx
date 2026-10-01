import { useLocale } from 'next-intl'

import { signoutAction } from '@/features/signout/api/signoutAction'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

export function SignoutDropdownItem() {
  const locale = useLocale()

  return (
    <DropdownMenuItem
      variant='destructive'
      onClick={signoutAction.bind(null, locale)}
    >
      Log out
    </DropdownMenuItem>
  )
}
