'use client'

import { EditAvatarForm } from '@/features/manage-profile/ui/EditAvatarForm'
import { useDialogContext } from '@/shared/lib/contexts/DialogContext'
import { User } from '@/shared/lib/prisma/generated/client'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

export function EditAvatarDropdownItem({ avatarUrl }: Pick<User, 'avatarUrl'>) {
  const { openDialog } = useDialogContext()

  return (
    <DropdownMenuItem
      onClick={() => openDialog(<EditAvatarForm avatarUrl={avatarUrl} />)}
    >
      Edit Avatar
    </DropdownMenuItem>
  )
}
