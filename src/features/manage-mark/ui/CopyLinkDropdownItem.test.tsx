import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { MESSAGE_CODES } from '@/shared/api/types'
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

    const btn = screen.getByText('items.copy')
    await userEvent.click(btn)

    expect(copy).toHaveBeenCalledWith(url)
    expect(await screen.findByText('successTitle')).toBeInTheDocument()
    expect(await screen.findByText(message)).toBeInTheDocument()
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

    const btn = screen.getByText('items.copy')
    await userEvent.click(btn)

    expect(copy).toHaveBeenCalledWith(url)
    expect(await screen.findAllByText('errorTitle')).toHaveLength(2) // toast and sr-only toast version
    expect(await screen.findAllByText(message)).toHaveLength(2)
  })
})
