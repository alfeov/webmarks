'use client'

import { WebMarkWithTags } from '@/entities/mark/model/types'
import { useTagsContext } from '@/entities/tag/model/TagsContext'
import { ChangeMarkTagsForm } from '@/features/manage-mark/ui/ChangeMarkTagsForm'
import { useDialogContext } from '@/shared/lib/contexts/DialogContext'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

type ChangeMarkTagsDropdownItemProps = {
  markId: WebMarkWithTags['id']
  markTags: WebMarkWithTags['tags']
}

export function ChangeMarkTagsDropdownItem({
  markId,
  markTags,
}: ChangeMarkTagsDropdownItemProps) {
  const { openDialog } = useDialogContext()
  const tags = useTagsContext()

  return (
    <>
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
      >
        Change Tags
      </DropdownMenuItem>
    </>
  )
}
