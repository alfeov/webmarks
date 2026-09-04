'use client'

import { createContext, useState } from 'react'

import { UniversalDialog } from '@/shared/ui/UniversalDialog'

import { createUseContextHook } from '../utils/createUseContextHook'

type DialogContextValue = {
  isDialogOpen: boolean
  openDialog: (dialogContent: React.ReactNode) => void
  closeDialog: () => void
}

const DialogContext = createContext<null | DialogContextValue>(null)

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null)

  const openDialog = (dialogContent: React.ReactNode) => {
    setDialogContent(dialogContent)
    setIsDialogOpen(true)
  }
  const closeDialog = () => {
    setDialogContent(null)
    setIsDialogOpen(false)
  }

  return (
    <DialogContext value={{ isDialogOpen, openDialog, closeDialog }}>
      {children}
      <UniversalDialog dialogContent={dialogContent} />
    </DialogContext>
  )
}

export const useDialogContext = createUseContextHook(DialogContext)
