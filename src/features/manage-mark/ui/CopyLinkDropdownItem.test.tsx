import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { MESSAGE_CODES } from '@/shared/api/constants'
import { TEST_IDS } from '@/shared/config/testids'
import { copy } from '@/shared/lib/utils/copy'
import { DropdownMenu } from '@/shared/ui/dropdown-menu'
import { renderWithProviders } from '@/test/helpers/renderWithProviders'

import { CopyLinkDropdownItem } from './CopyLinkDropdownItem'

vi.mock('@/shared/lib/utils/copy')

const url = 'https://some-url.com'

describe('CopyLinkDropdownItem', () => {
  it('should show success toast on copy success', async () => {
    renderWithProviders(
      <DropdownMenu>
        <CopyLinkDropdownItem url={url} />
      </DropdownMenu>,
    )

    const message = MESSAGE_CODES.COPY_SUCCESS
    vi.mocked(copy).mockResolvedValueOnce({
      isSuccess: true,
      message,
    })

    const button = screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.COPY_MARK_LINK)
    await userEvent.click(button)

    expect(copy).toHaveBeenCalledWith(url)
    expect(await screen.findByText('toast.successTitle')).toBeInTheDocument()
    expect(await screen.findByText(`codes.${message}`)).toBeInTheDocument()
  })
  it('should show error toast on copy error', async () => {
    renderWithProviders(
      <DropdownMenu>
        <CopyLinkDropdownItem url={url} />
      </DropdownMenu>,
    )

    const message = MESSAGE_CODES.COPY_ERROR
    vi.mocked(copy).mockResolvedValueOnce({
      isSuccess: false,
      message,
    })

    const button = screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.COPY_MARK_LINK)
    await userEvent.click(button)

    expect(copy).toHaveBeenCalledWith(url)
    const toast = await screen.findByRole('alert')
    expect(toast).toHaveTextContent('toast.errorTitle')
    expect(toast).toHaveTextContent(`codes.${message}`)
  })
})
