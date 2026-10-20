'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/shared/ui/button'
import { Dialog, DialogContent } from '@/shared/ui/dialog'

import { useDialogContext } from '../lib/contexts/DialogContext'
import { useClickOutside } from '../lib/hooks/useClickOutside'
import { CloseDialogButton } from './CloseDialogButton'

export function UniversalDialog({
  isOpen,
  dialogContent,
}: {
  isOpen: boolean
  dialogContent: React.ReactNode
}) {
  const { closeDialog } = useDialogContext()
  const ref = useClickOutside(closeDialog)

  const t = useTranslations('UniversalDialog')

  return (
    isOpen && (
      <Dialog open>
        <DialogContent showCloseButton={false} className='gap-3' ref={ref}>
          <CloseDialogButton onClick={closeDialog} />
          <div className='no-scrollbar grid max-h-[70vh] gap-[10px] overflow-y-auto px-1 md:max-h-[90vh]'>
            {dialogContent}
            <Button variant='outline' onClick={closeDialog}>
              {t('button')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  )
}
