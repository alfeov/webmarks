import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { MESSAGE_CODES } from '@/shared/api/types'
import { DropdownMenu } from '@/shared/ui/dropdown-menu'
import { renderWithProviders } from '@/test/renderWithProviders'

import { toggleMarkPinnedAction } from '../api/toggleMarkPinnedAction'
import { PinMarkDropdownItem } from './PinMarkDropdownItem'

vi.mock('../api/toggleMarkPinnedAction')

const defaultMarkId = '1'

describe('PinMarkDropdownItem', () => {
  it('should render enabled elements by default', () => {
    renderWithProviders(
      <DropdownMenu>
        <PinMarkDropdownItem id={defaultMarkId} pinned />
      </DropdownMenu>,
    )

    expect(screen.getByRole('button')).toBeEnabled()
  })
  it('should render unpin text when received pinned', () => {
    renderWithProviders(
      <DropdownMenu>
        <PinMarkDropdownItem id={defaultMarkId} pinned />
      </DropdownMenu>,
    )

    expect(screen.getByRole('button')).toHaveTextContent('items.unpin')
  })
  it('should render pin text when received pinned is false', () => {
    renderWithProviders(
      <DropdownMenu>
        <PinMarkDropdownItem id={defaultMarkId} pinned={false} />
      </DropdownMenu>,
    )

    expect(screen.getByRole('button')).toHaveTextContent('items.pin')
  })
  it('should call Action with mark id and pinned state', async () => {
    const isPinned = false
    renderWithProviders(
      <DropdownMenu>
        <PinMarkDropdownItem id={defaultMarkId} pinned={isPinned} />
      </DropdownMenu>,
    )

    vi.mocked(toggleMarkPinnedAction).mockResolvedValueOnce({
      isSuccess: true,
      message: MESSAGE_CODES.TOGGLE_MARK_PIN_SUCCESS,
    })

    const submit = screen.getByRole('button')
    await userEvent.click(submit)

    expect(toggleMarkPinnedAction).toHaveBeenCalledWith(
      {
        id: defaultMarkId,
        pinned: isPinned,
      },
      expect.any(Object),
      expect.any(Object),
    )
  })
})
