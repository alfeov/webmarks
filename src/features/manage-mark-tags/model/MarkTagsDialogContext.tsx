'use client'

import { createContext, use, useState } from 'react'

import { MarkTagsDialog } from '../ui/MarkTagsDialog'

export type MarkTagsDialogValue = {
  isDialogOpen: boolean
  openDialog: () => void
  closeDialog: () => void
}

const MarkTagsDialogContext = createContext<null | MarkTagsDialogValue>(null)

export function MarkTagsDialogProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openDialog = () => setIsDialogOpen(true)
  const closeDialog = () => setIsDialogOpen(false)

  return (
    <MarkTagsDialogContext value={{ isDialogOpen, openDialog, closeDialog }}>
      {children}
      <MarkTagsDialog />
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
