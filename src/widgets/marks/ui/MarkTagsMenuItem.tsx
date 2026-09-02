'use client'

import { useActiveMarkContext } from '@/entities/mark/model/ActiveMarkContext'
import { WebMarkWithTags } from '@/entities/mark/model/types'
import { MarkTagsForm } from '@/features/manage-mark-tags/ui/MarkTagsForm'
import { useDialogContext } from '@/shared/lib/contexts/DialogContext'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

type MarkTagsDropdownItemProps = WebMarkWithTags

export function MarkTagsDropdownItem({ ...mark }: MarkTagsDropdownItemProps) {
  const { openDialog } = useDialogContext()
  const { setActiveMark } = useActiveMarkContext()

  return (
    <>
      <DropdownMenuItem
        data-slot='dialog-trigger'
        onClick={() => {
          openDialog(<MarkTagsForm />)
          setActiveMark(mark)
        }}
      >
        Tags
      </DropdownMenuItem>
    </>
  )
}
