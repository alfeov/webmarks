'use client'

import { useTranslations } from 'next-intl'

import { TEST_IDS } from '@/shared/config/testids'
import { useDialogContext } from '@/shared/lib/contexts/DialogContext'
import { useClickOutside } from '@/shared/lib/hooks/useClickOutside'
import { Button } from '@/shared/ui/button'
import { Dialog, DialogContent } from '@/shared/ui/dialog'

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
        <DialogContent
          ref={ref}
          showCloseButton={false}
          className='gap-3'
          data-testid={TEST_IDS.STATIC.DIALOG}
        >
          <CloseDialogButton
            onClick={closeDialog}
            data-testid={TEST_IDS.CLICKABLE.BUTTON.CLOSE_DIALOG}
          />
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
