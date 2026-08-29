import { logoutAction } from '@/features/auth/api/logoutAction'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

export function LogoutMenuItem() {
  return (
    <DropdownMenuItem variant='destructive' onClick={logoutAction}>
      Log out
    </DropdownMenuItem>
  )
}
