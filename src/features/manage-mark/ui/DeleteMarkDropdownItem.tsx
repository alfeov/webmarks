'use client'

import { useDialogContext } from '@/shared/lib/contexts/DialogContext'
import { WebMark } from '@/shared/lib/prisma/generated/client'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

import { DeleteMarkForm } from './DeleteMarkForm'

export function DeleteMarkDropdownItem({ id }: { id: WebMark['id'] }) {
  const { openDialog } = useDialogContext()

  return (
    <DropdownMenuItem
      onClick={() => openDialog(<DeleteMarkForm markId={id} />)}
    >
      Delete
    </DropdownMenuItem>
  )
}
