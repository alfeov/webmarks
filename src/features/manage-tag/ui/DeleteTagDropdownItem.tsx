'use client'

import { useDialogContext } from '@/shared/lib/contexts/DialogContext'
import { Tag } from '@/shared/lib/prisma/generated/client'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

import { DeleteTagForm } from './DeleteTagForm'

export function DeleteTagDropdownItem({ tagId }: { tagId: Tag['id'] }) {
  const { openDialog } = useDialogContext()

  return (
    <DropdownMenuItem
      onClick={() => openDialog(<DeleteTagForm tagId={tagId} />)}
    >
      Delete
    </DropdownMenuItem>
  )
}
