import { useEffect } from 'react'

import { useDialogContext } from '../contexts/DialogContext'

export function useCloseDialogOn(condition: boolean) {
  const { closeDialog } = useDialogContext()

  useEffect(() => {
    if (condition) closeDialog()
  }, [condition, closeDialog])
}
