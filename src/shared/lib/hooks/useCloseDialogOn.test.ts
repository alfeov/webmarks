import { renderHook } from '@testing-library/react'

import { useCloseDialogOn } from './useCloseDialogOn'

const closeDialog = vi.fn()

vi.mock('../contexts/DialogContext', () => ({
  useDialogContext: () => ({
    closeDialog,
  }),
}))

describe('useCloseDialogOn', () => {
  it('should call closeDialog on condition', () => {
    renderHook(() => useCloseDialogOn(true))

    expect(closeDialog).toHaveBeenCalled()
  })
  it('should not call closeDialog when condition is falsy', () => {
    renderHook(() => useCloseDialogOn(false))

    expect(closeDialog).not.toHaveBeenCalled()
  })
})
