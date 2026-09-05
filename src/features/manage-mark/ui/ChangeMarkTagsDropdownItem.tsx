'use client'

import { WebMarkWithTags } from '@/entities/mark/model/types'
import { ChangeMarkTagsForm } from '@/features/manage-mark/ui/ChangeMarkTagsForm'
import { useDialogContext } from '@/shared/lib/contexts/DialogContext'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

type ChangeMarkTagsDropdownItemProps = WebMarkWithTags

export function ChangeMarkTagsDropdownItem({
  ...mark
}: ChangeMarkTagsDropdownItemProps) {
  const { openDialog } = useDialogContext()

  return (
    <>
      <DropdownMenuItem
        data-slot='dialog-trigger'
        onClick={() =>
          openDialog(
            <ChangeMarkTagsForm markId={mark.id} markTags={mark.tags} />,
          )
        }
      >
        Change Tags
      </DropdownMenuItem>
    </>
  )
}
