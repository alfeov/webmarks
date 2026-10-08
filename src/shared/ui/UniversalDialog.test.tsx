import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { DialogProvider } from '../lib/contexts/DialogContext'

describe('UniversalDialog', () => {
  it('should render inside provider and show dialog content when isDialogOpen true', () => {
    render(
      <DialogProvider initialOpen initialDialogContent={<div>Content</div>}>
        {null}
      </DialogProvider>,
    )

    expect(screen.getByText('Content')).toBeInTheDocument()
  })
  it('should not render when isDialogOpen false', () => {
    render(
      <DialogProvider
        initialOpen={false}
        initialDialogContent={<div>Content</div>}
      >
        {null}
      </DialogProvider>,
    )

    expect(screen.queryByText('Content')).not.toBeInTheDocument()
  })
  it('should close dialog when close button is clicked', async () => {
    render(
      <DialogProvider initialOpen initialDialogContent={<div>Content</div>}>
        {null}
      </DialogProvider>,
    )

    expect(screen.getByText('Content')).toBeInTheDocument()

    const closeButton = screen.getByRole('button', { name: /close/i })
    await userEvent.click(closeButton)

    expect(screen.queryByText('Content')).not.toBeInTheDocument()
  })
  it('should close dialog when close (icon) button is clicked', async () => {
    render(
      <DialogProvider initialOpen initialDialogContent={<div>Content</div>}>
        {null}
      </DialogProvider>,
    )

    expect(screen.getByText('Content')).toBeInTheDocument()

    const closeButton = screen.getByRole('button', { name: '' })
    await userEvent.click(closeButton)

    expect(screen.queryByText('Content')).not.toBeInTheDocument()
  })
  it('should close dialog when click outside dialog', async () => {
    render(
      <DialogProvider initialOpen initialDialogContent={<div>Content</div>}>
        <div>Component outside dialog</div>
      </DialogProvider>,
    )

    expect(screen.getByText('Content')).toBeInTheDocument()

    const outsideComponent = screen.getByText(/outside/i)
    await userEvent.click(outsideComponent)

    expect(screen.queryByText('Content')).not.toBeInTheDocument()
  })
  it('should not close dialog when click on dialog', async () => {
    render(
      <DialogProvider initialOpen initialDialogContent={<div>Content</div>}>
        {null}
      </DialogProvider>,
    )

    expect(screen.getByText('Content')).toBeInTheDocument()

    const dialogContent = screen.getByText('Content')
    await userEvent.click(dialogContent)

    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})
