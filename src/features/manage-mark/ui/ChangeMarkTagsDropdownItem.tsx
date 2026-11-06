'use client'

import { useTranslations } from 'next-intl'

import type { WebMarkWithTags } from '@/entities/mark/model/types'
import { ChangeMarkTagsForm } from '@/features/manage-mark/ui/ChangeMarkTagsForm'
import { TEST_IDS } from '@/shared/config/testids'
import { useDialogContext } from '@/shared/lib/contexts/DialogContext'
import type { Tag } from '@/shared/lib/prisma/generated/client'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

type ChangeMarkTagsDropdownItemProps = {
  markId: WebMarkWithTags['id']
  markTags: WebMarkWithTags['tags']
  tags: Tag[]
}

export function ChangeMarkTagsDropdownItem({
  markId,
  markTags,
  tags,
}: ChangeMarkTagsDropdownItemProps) {
  const { openDialog } = useDialogContext()

  const t = useTranslations('MarkDropdownMenu')

  return (
    <DropdownMenuItem
      data-slot='dialog-trigger'
      onClick={() =>
        openDialog(
          <ChangeMarkTagsForm
            markId={markId}
            markTags={markTags}
            tags={tags}
          />,
        )
      }
      data-testid={TEST_IDS.CLICKABLE.BUTTON.CHANGE_MARK_TAGS}
    >
      {t('items.changeTags')}
    </DropdownMenuItem>
  )
}
