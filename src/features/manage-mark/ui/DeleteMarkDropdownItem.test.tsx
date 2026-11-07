import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TEST_IDS } from '@/shared/config/testids'
import { DropdownMenu } from '@/shared/ui/dropdown-menu'
import { renderWithProviders } from '@/test/helpers/renderWithProviders'

import { DeleteMarkDropdownItem } from './DeleteMarkDropdownItem'
import { DeleteMarkForm } from './DeleteMarkForm'

vi.mock('@/features/manage-mark/ui/DeleteMarkForm')

const markId = '1'

describe('DeleteMarkDropdownItem', () => {
  it('should open DeleteMarkForm on click and pass corresponding arguments to it', async () => {
    renderWithProviders(
      <DropdownMenu>
        <DeleteMarkDropdownItem id={markId} />
      </DropdownMenu>,
    )

    await userEvent.click(
      screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.DELETE_MARK),
    )

    expect(DeleteMarkForm).toHaveBeenCalledWith(
      {
        markId,
      },
      undefined,
    )
  })
})
