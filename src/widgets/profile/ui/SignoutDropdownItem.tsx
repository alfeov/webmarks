import { signoutAction } from '@/features/signout/api/signoutAction'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

export function SignoutDropdownItem() {
  return (
    <DropdownMenuItem variant='destructive' onClick={signoutAction}>
      Log out
    </DropdownMenuItem>
  )
}
