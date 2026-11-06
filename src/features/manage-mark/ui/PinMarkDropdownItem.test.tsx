import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { toggleMarkPinnedAction } from '@/features/manage-mark/api/toggleMarkPinnedAction'
import { TEST_IDS } from '@/shared/config/testids'
import { DropdownMenu } from '@/shared/ui/dropdown-menu'
import { renderWithProviders } from '@/test/helpers/renderWithProviders'

import { PinMarkDropdownItem } from './PinMarkDropdownItem'

vi.mock('../api/toggleMarkPinnedAction')

const defaultMarkId = '1'

describe('PinMarkDropdownItem', () => {
  it('should render unpin text when received pinned', () => {
    renderWithProviders(
      <DropdownMenu>
        <PinMarkDropdownItem id={defaultMarkId} pinned />
      </DropdownMenu>,
    )

    expect(
      screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.PIN_MARK),
    ).toHaveTextContent('items.unpin')
  })
  it('should render pin text when received pinned is false', () => {
    renderWithProviders(
      <DropdownMenu>
        <PinMarkDropdownItem id={defaultMarkId} pinned={false} />
      </DropdownMenu>,
    )

    expect(
      screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.PIN_MARK),
    ).toHaveTextContent('items.pin')
  })
  it('should call Action with mark id and pinned state', async () => {
    const isPinned = false
    renderWithProviders(
      <DropdownMenu>
        <PinMarkDropdownItem id={defaultMarkId} pinned={isPinned} />
      </DropdownMenu>,
    )

    vi.mocked(toggleMarkPinnedAction).mockResolvedValueOnce()

    const submit = screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.PIN_MARK)
    await userEvent.click(submit)

    expect(toggleMarkPinnedAction).toHaveBeenCalledWith(
      {
        id: defaultMarkId,
        pinned: isPinned,
      },
      undefined,
      undefined,
    )
  })
})
