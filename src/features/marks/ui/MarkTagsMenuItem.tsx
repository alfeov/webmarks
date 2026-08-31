'use client'

import { Tag } from '@/shared/lib/prisma/generated/client'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

import { useMarkTagsDialogContext } from '../model/MarkTagsDialogContext'

export function MarkTagsMenuItem({ markTags }: { markTags: Tag[] }) {
  const { openDialog } = useMarkTagsDialogContext()

  return (
    <>
      <DropdownMenuItem
        data-slot='dialog-trigger'
        onClick={() => openDialog(markTags)}
      >
        Tags
      </DropdownMenuItem>
    </>
  )
}
