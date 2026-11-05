'use client'

import { useTranslations } from 'next-intl'

import { TEST_IDS } from '@/shared/config/testids'
import { useDialogContext } from '@/shared/lib/contexts/DialogContext'
import type { Tag } from '@/shared/lib/prisma/generated/client'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

import { EditTagForm } from './EditTagForm'

type EditTagDropdownItemProps = Tag

export function EditTagDropdownItem({ ...tag }: EditTagDropdownItemProps) {
  const { openDialog } = useDialogContext()

  const t = useTranslations('TagDropdownMenu')

  return (
    <DropdownMenuItem
      data-testid={TEST_IDS.CLICKABLE.BUTTON.EDIT_TAG}
      onClick={() => openDialog(<EditTagForm {...tag} />)}
    >
      {t('items.edit')}
    </DropdownMenuItem>
  )
}
