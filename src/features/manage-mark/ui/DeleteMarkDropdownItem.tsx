'use client'

import { useTranslations } from 'next-intl'

import { TEST_IDS } from '@/shared/config/testids'
import { useDialogContext } from '@/shared/lib/contexts/DialogContext'
import type { WebMark } from '@/shared/lib/prisma/generated/client'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

import { DeleteMarkForm } from './DeleteMarkForm'

export function DeleteMarkDropdownItem({ id }: { id: WebMark['id'] }) {
  const { openDialog } = useDialogContext()

  const t = useTranslations('MarkDropdownMenu')

  return (
    <DropdownMenuItem
      variant='destructive'
      onClick={() => openDialog(<DeleteMarkForm markId={id} />)}
      data-testid={TEST_IDS.CLICKABLE.BUTTON.DELETE_MARK}
    >
      {t('items.delete')}
    </DropdownMenuItem>
  )
}
