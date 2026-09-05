'use client'

import { WebMarkWithTags } from '@/entities/mark/model/types'
import { useDialogContext } from '@/shared/lib/contexts/DialogContext'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

import { EditMarkForm } from './EditMarkForm'

export function EditMarkDropdownItem({ ...mark }: WebMarkWithTags) {
  const { openDialog } = useDialogContext()

  return (
    <DropdownMenuItem onClick={() => openDialog(<EditMarkForm {...mark} />)}>
      Edit
    </DropdownMenuItem>
  )
}
