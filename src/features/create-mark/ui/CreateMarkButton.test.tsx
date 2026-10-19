import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithProviders } from '@/test/helpers/renderWithProviders'

import { CreateMarkButton } from './CreateMarkButton'

vi.mock('./CreateMark', () => ({
  CreateMark: () => <div data-testid='create-mark' />,
}))

it('should open CreateMark dialog on click', async () => {
  renderWithProviders(<CreateMarkButton />)
  await userEvent.click(screen.getByRole('button'))

  expect(screen.getByTestId('create-mark')).toBeInTheDocument()
})
