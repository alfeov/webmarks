import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TEST_IDS } from '@/shared/config/testids'
import { renderWithProviders } from '@/test/helpers/renderWithProviders'

import { CreateMarkButton } from './CreateMarkButton'

const CREATE_MARK_DIALOG_TEST_ID = 'create-mark-dialog'

vi.mock('./CreateMark', () => ({
  CreateMark: () => <div data-testid={CREATE_MARK_DIALOG_TEST_ID} />,
}))

it('should open CreateMark dialog on click', async () => {
  renderWithProviders(<CreateMarkButton />)
  await userEvent.click(
    screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.CREATE_MARK),
  )

  expect(screen.getByTestId(CREATE_MARK_DIALOG_TEST_ID)).toBeInTheDocument()
})
