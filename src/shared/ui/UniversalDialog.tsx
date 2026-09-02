'use client'

import { CloseDialogButton } from '@/shared/ui/CloseDialogButton'
import { Dialog, DialogContent } from '@/shared/ui/dialog'

import { useDialogContext } from '../lib/contexts/DialogContext'

export function UniversalDialog({
  dialogContent,
}: {
  dialogContent: React.ReactNode
}) {
  const { isDialogOpen, closeDialog } = useDialogContext()

  return (
    <Dialog open={isDialogOpen}>
      <DialogContent showCloseButton={false}>
        {dialogContent}
        <CloseDialogButton onClick={closeDialog} />
      </DialogContent>
    </Dialog>
  )
}
