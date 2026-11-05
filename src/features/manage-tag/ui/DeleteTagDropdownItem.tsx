'use client'

import { useTranslations } from 'next-intl'

import { TEST_IDS } from '@/shared/config/testids'
import { useDialogContext } from '@/shared/lib/contexts/DialogContext'
import type { Tag } from '@/shared/lib/prisma/generated/client'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

import { DeleteTagForm } from './DeleteTagForm'

export function DeleteTagDropdownItem({ tagId }: { tagId: Tag['id'] }) {
  const { openDialog } = useDialogContext()

  const t = useTranslations('TagDropdownMenu')

  return (
    <DropdownMenuItem
      data-testid={TEST_IDS.CLICKABLE.BUTTON.DELETE_TAG}
      onClick={() => openDialog(<DeleteTagForm tagId={tagId} />)}
    >
      {t('items.delete')}
    </DropdownMenuItem>
  )
}
