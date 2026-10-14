'use client'

import { createContext, useCallback, useMemo, useState } from 'react'

import { UniversalDialog } from '@/shared/ui/UniversalDialog'

import { createUseContextHook } from '../utils/createUseContextHook'

type DialogContextValue = {
  openDialog: (dialogContent: React.ReactNode) => void
  closeDialog: () => void
}

const DialogContext = createContext<null | DialogContextValue>(null)

export type DialogProviderProps = {
  initialDialogOpen?: boolean
  initialDialogContent?: React.ReactNode
  children: React.ReactNode
}

export function DialogProvider({
  initialDialogOpen = false,
  initialDialogContent = null,
  children,
}: DialogProviderProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(initialDialogOpen)
  const [dialogContent, setDialogContent] =
    useState<React.ReactNode>(initialDialogContent)

  const openDialog = useCallback((dialogContent: React.ReactNode) => {
    setDialogContent(dialogContent)
    setIsDialogOpen(true)
  }, [])
  const closeDialog = useCallback(() => {
    setIsDialogOpen(false)
  }, [])

  const value = useMemo(
    () => ({ openDialog, closeDialog }),
    [openDialog, closeDialog],
  )

  return (
    <DialogContext value={value}>
      {children}
      <UniversalDialog dialogContent={dialogContent} isOpen={isDialogOpen} />
    </DialogContext>
  )
}

export const useDialogContext = createUseContextHook(DialogContext)
