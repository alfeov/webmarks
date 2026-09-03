'use client'

import { useDialogContext } from '@/shared/lib/contexts/DialogContext'
import { Tag } from '@/shared/lib/prisma/generated/client'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

import { EditTagForm } from './EditTagForm'

type EditTagDropdownItemProps = Tag

export function EditTagDropdownItem({ ...tag }: EditTagDropdownItemProps) {
  const { openDialog } = useDialogContext()

  return (
    <DropdownMenuItem onClick={() => openDialog(<EditTagForm {...tag} />)}>
      Edit
    </DropdownMenuItem>
  )
}
