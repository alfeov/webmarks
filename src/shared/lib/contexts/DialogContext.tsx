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

type DialogProviderProps = {
  initialOpen?: boolean
  initialDialogContent?: React.ReactNode
  children: React.ReactNode
}

export function DialogProvider({
  initialOpen = false,
  initialDialogContent = null,
  children,
}: DialogProviderProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(initialOpen)
  const [dialogContent, setDialogContent] =
    useState<React.ReactNode>(initialDialogContent)

  const openDialog = (dialogContent: React.ReactNode) => {
    setDialogContent(dialogContent)
    setIsDialogOpen(true)
  }
  const closeDialog = () => {
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
