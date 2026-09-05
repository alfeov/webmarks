'use client'

import { CloseDialogButton } from '@/shared/ui/CloseDialogButton'
import { Dialog, DialogContent } from '@/shared/ui/dialog'

import { useDialogContext } from '../lib/contexts/DialogContext'
import { Button } from './button'

export function UniversalDialog({
  dialogContent,
}: {
  dialogContent: React.ReactNode
}) {
  const { isDialogOpen, closeDialog } = useDialogContext()

  return (
    <Dialog open={isDialogOpen}>
      <DialogContent showCloseButton={false} className='gap-3'>
        <CloseDialogButton onClick={closeDialog} />
        {dialogContent}
        <Button variant='outline' onClick={closeDialog}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  )
}
