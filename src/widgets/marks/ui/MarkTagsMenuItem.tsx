'use client'

import { useActiveMarkContext } from '@/entities/mark/model/ActiveMarkContext'
import { WebMarkWithTags } from '@/entities/mark/model/types'
import { useMarkTagsDialogContext } from '@/features/manage-mark-tags/model/MarkTagsDialogContext'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

type MarkTagsMenuItemProps = WebMarkWithTags

export function MarkTagsMenuItem({ ...mark }: MarkTagsMenuItemProps) {
  const { openDialog } = useMarkTagsDialogContext()
  const { setActiveMark } = useActiveMarkContext()

  return (
    <>
      <DropdownMenuItem
        data-slot='dialog-trigger'
        onClick={() => {
          openDialog()
          setActiveMark(mark)
        }}
      >
        Tags
      </DropdownMenuItem>
    </>
  )
}
