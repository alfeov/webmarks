import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { DropdownMenu } from '@/shared/ui/dropdown-menu'
import { renderWithProviders } from '@/test/renderWithProviders'

import { EditTagDropdownItem } from './EditTagDropdownItem'
import { EditTagForm } from './EditTagForm'

vi.mock('./EditTagForm')

const defaultProps = {
  id: '1',
  title: 'Some tag title',
  updatedAt: new Date(),
  createdAt: new Date(),
  userId: '1',
}

describe('EditTagDropdownItem', () => {
  it('should open EditTagForm on click and pass corresponding arguments to it', async () => {
    renderWithProviders(
      <DropdownMenu>
        <EditTagDropdownItem {...defaultProps} />
      </DropdownMenu>,
    )

    await userEvent.click(screen.getByText('items.edit'))

    expect(EditTagForm).toHaveBeenCalledWith(defaultProps, undefined)
  })
})
