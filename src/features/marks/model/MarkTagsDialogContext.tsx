'use client'

import { createContext, use, useState } from 'react'

import { Tag } from '@/shared/lib/prisma/generated/client'

import { MarkTagsDialog } from '../ui/MarkTagsDialog'

export type MarkTagsDialogValue = {
  markTags: Tag[]
  openDialog: (markTags: Tag[]) => void
  closeDialog: () => void
}

const MarkTagsDialogContext = createContext<null | MarkTagsDialogValue>(null)

export function MarkTagsDialogProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [markTags, setMarkTags] = useState<Tag[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openDialog = (markTags: Tag[]) => {
    setMarkTags(markTags)
    setIsDialogOpen(true)
  }
  const closeDialog = () => setIsDialogOpen(false)

  return (
    <MarkTagsDialogContext value={{ markTags, openDialog, closeDialog }}>
      {children}
      <MarkTagsDialog isOpen={isDialogOpen} closeDialog={closeDialog} />
    </MarkTagsDialogContext>
  )
}

export function useMarkTagsDialogContext() {
  const markTagsDialog = use(MarkTagsDialogContext)
  if (!markTagsDialog)
    throw new Error(
      'Component must be wrapped in ContextProvider to use this hook',
    )

  return markTagsDialog
}
