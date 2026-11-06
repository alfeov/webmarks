import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TEST_IDS } from '@/shared/config/testids'
import { DropdownMenu } from '@/shared/ui/dropdown-menu'
import { renderWithProviders } from '@/test/helpers/renderWithProviders'

import { EditMarkDropdownItem } from './EditMarkDropdownItem'
import { EditMarkForm } from './EditMarkForm'

vi.mock('./EditMarkForm')

const defaultProps = {
  id: '1',
  title: 'Vercel',
  url: 'https://some-url.com',
  description: 'Some cool description',
  pinned: true,
  logoUrl: 'https://some-url.png',
  updatedAt: new Date(),
  createdAt: new Date(),
  userId: '1',
  tags: [
    {
      id: '1',
      title: 'Vercel',
      updatedAt: new Date(),
      createdAt: new Date(),
      userId: '1',
    },
  ],
}

describe('EditMarkDropdownItem', () => {
  it('should open EditMarkForm on click and pass corresponding arguments to it', async () => {
    renderWithProviders(
      <DropdownMenu>
        <EditMarkDropdownItem {...defaultProps} />
      </DropdownMenu>,
    )

    await userEvent.click(
      screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.EDIT_MARK),
    )

    expect(EditMarkForm).toHaveBeenCalledWith(defaultProps, undefined)
  })
})
