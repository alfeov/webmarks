'use client'

import { useTranslations } from 'next-intl'

import { WebMarkWithTags } from '@/entities/mark/model/types'
import { useDialogContext } from '@/shared/lib/contexts/DialogContext'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

import { EditMarkForm } from './EditMarkForm'

export function EditMarkDropdownItem({ ...mark }: WebMarkWithTags) {
  const { openDialog } = useDialogContext()

  const t = useTranslations('MarkDropdownMenu')

  return (
    <DropdownMenuItem onClick={() => openDialog(<EditMarkForm {...mark} />)}>
      {t('items.edit')}
    </DropdownMenuItem>
  )
}
