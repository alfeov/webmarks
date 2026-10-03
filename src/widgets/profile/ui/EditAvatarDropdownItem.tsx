'use client'

import { useTranslations } from 'next-intl'

import { EditAvatarForm } from '@/features/manage-profile/ui/EditAvatarForm'
import { useDialogContext } from '@/shared/lib/contexts/DialogContext'
import { User } from '@/shared/lib/prisma/generated/client'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

export function EditAvatarDropdownItem({ avatarUrl }: Pick<User, 'avatarUrl'>) {
  const { openDialog } = useDialogContext()

  const t = useTranslations('ProfileDropdownMenu')

  return (
    <DropdownMenuItem
      onClick={() => openDialog(<EditAvatarForm avatarUrl={avatarUrl} />)}
    >
      {t('items.editAvatar')}
    </DropdownMenuItem>
  )
}
