import { useEffect } from 'react'

import { useDialogContext } from '@/shared/lib/contexts/DialogContext'

export function useCloseDialogOn(condition: boolean) {
  const { closeDialog } = useDialogContext()

  useEffect(() => {
    if (condition) closeDialog()
  }, [condition, closeDialog])
}
