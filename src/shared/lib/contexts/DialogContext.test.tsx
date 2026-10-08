import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { DialogProvider, useDialogContext } from './DialogContext'

const Consumer = () => {
  const { isDialogOpen, closeDialog, openDialog } = useDialogContext()

  return (
    <div>
      <div data-testid='isOpen'>{isDialogOpen ? 'Opened' : 'Closed'}</div>
      <button onClick={() => openDialog(<div>Content</div>)}>
        Open dialog
      </button>
      <button onClick={closeDialog}>Close dialog</button>
      <button onClick={() => openDialog(<div>Another component</div>)}>
        Replace component
      </button>
    </div>
  )
}

describe('DialogContext', () => {
  describe('DialogProvider', () => {
    it('should not show dialog by default when initialOpen is false even if content is provided', () => {
      render(
        <DialogProvider initialDialogContent={<div>Content</div>}>
          <Consumer />
        </DialogProvider>,
      )

      const isOpen = screen.getByTestId('isOpen')
      expect(isOpen.textContent).toBe('Closed')
      expect(screen.queryByText('Content')).not.toBeInTheDocument()
    })
    it('should show dialog when provided corresponding props', () => {
      render(
        <DialogProvider initialOpen initialDialogContent={<div>Content</div>}>
          <Consumer />
        </DialogProvider>,
      )

      const isOpen = screen.getByTestId('isOpen')
      expect(isOpen.textContent).toBe('Opened')
      expect(screen.getByText('Content')).toBeInTheDocument()
    })
    it('should open dialog when openDialog function is called', async () => {
      render(
        <DialogProvider>
          <Consumer />
        </DialogProvider>,
      )

      expect(screen.queryByText('Content')).not.toBeInTheDocument()

      const openDialogButton = screen.getByText(/open dialog/i)
      await userEvent.click(openDialogButton)

      expect(screen.getByTestId('isOpen').textContent).toBe('Opened')
      expect(screen.getByText('Content')).toBeInTheDocument()
    })
    it('should close dialog when closeDialog function is called', async () => {
      render(
        <DialogProvider initialOpen initialDialogContent={<div>Content</div>}>
          <Consumer />
        </DialogProvider>,
      )

      expect(screen.getByText('Content')).toBeInTheDocument()

      const closeDialogButton = screen.getByText(/close dialog/i)
      await userEvent.click(closeDialogButton)

      expect(screen.queryByText('Content')).not.toBeInTheDocument()
    })
    it('should replace content of dialog when it provided from openDialog function', async () => {
      render(
        <DialogProvider initialOpen initialDialogContent={<div>Content</div>}>
          <Consumer />
        </DialogProvider>,
      )

      expect(screen.getByText('Content')).toBeInTheDocument()

      const replaceButton = screen.getByText(/replace/i)
      await userEvent.click(replaceButton)

      expect(screen.queryByText('Content')).not.toBeInTheDocument()
      expect(screen.getByText(/another/i)).toBeInTheDocument()
    })
  })
})
