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
    <>
      {isDialogOpen && (
        <Dialog open>
          <DialogContent showCloseButton={false} className='gap-3' ref={ref}>
            <CloseDialogButton onClick={closeDialog} />
            <div className='no-scrollbar grid max-h-[70vh] gap-[10px] overflow-y-auto px-1 md:max-h-[90vh]'>
              {dialogContent}
              <Button variant='outline' onClick={closeDialog}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
