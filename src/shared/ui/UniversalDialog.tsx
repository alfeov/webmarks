'use client'

import { CloseDialogButton } from '@/shared/ui/CloseDialogButton'
import { Dialog, DialogContent } from '@/shared/ui/dialog'

import { useDialogContext } from '../lib/contexts/DialogContext'
import { useClickOutside } from '../lib/hooks/useClickOutside'
import { Button } from './button'

export function UniversalDialog({
  dialogContent,
}: {
  dialogContent: React.ReactNode
}) {
  const { isDialogOpen, closeDialog } = useDialogContext()
  const ref = useClickOutside(closeDialog)

  return (
    <Dialog open={isDialogOpen}>
      <DialogContent showCloseButton={false} className='gap-3' ref={ref}>
        <CloseDialogButton onClick={closeDialog} />
        {dialogContent}
        <Button variant='outline' onClick={closeDialog}>
          Close Dialog
        </Button>
      </DialogContent>
    </Dialog>
  )
}
