'use client'

import { useTranslations } from 'next-intl'

import { useDialogContext } from '@/shared/lib/contexts/DialogContext'
import { Tag } from '@/shared/lib/prisma/generated/client'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

import { DeleteTagForm } from './DeleteTagForm'

export function DeleteTagDropdownItem({ tagId }: { tagId: Tag['id'] }) {
  const { openDialog } = useDialogContext()

  const t = useTranslations('TagDropdownMenu')

  return (
    <DropdownMenuItem
      onClick={() => openDialog(<DeleteTagForm tagId={tagId} />)}
    >
      {t('items.delete')}
    </DropdownMenuItem>
  )
}
