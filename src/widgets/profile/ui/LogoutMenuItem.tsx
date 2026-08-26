import { logout } from '@/features/auth/api/logout'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

export function LogoutMenuItem() {
  return (
    <DropdownMenuItem variant='destructive' onClick={logout}>
      Log out
    </DropdownMenuItem>
  )
}
