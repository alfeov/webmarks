import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { MESSAGE_CODES } from '@/shared/api/types'
import { renderWithProviders } from '@/test/renderWithProviders'

import { editAvatarAction } from '../api/editAvatarAction'
import { EditAvatarForm } from './EditAvatarForm'

vi.mock('../api/editAvatarAction')

const defaultData = {
  avatarUrl: 'https://some-url.png',
}

describe('CreateTagForm', () => {
  it('should render enabled elements by default with default values', () => {
    renderWithProviders(<EditAvatarForm {...defaultData} />)

    const input = screen.getByPlaceholderText(/logo.com/i)
    expect(input).toBeEnabled()
    expect(input).toHaveValue(defaultData.avatarUrl)
    expect(screen.getByRole('button')).toBeEnabled()
  })
  it('should render empty string as default value if avatarUrl is null', () => {
    renderWithProviders(<EditAvatarForm avatarUrl={null} />)

    expect(screen.getByPlaceholderText(/logo.com/i)).toHaveValue('')
  })
  it('should show validation error if received error', async () => {
    renderWithProviders(<EditAvatarForm {...defaultData} />)

    const validationMessage = 'SOME_ERROR_CODE'
    vi.mocked(editAvatarAction).mockResolvedValueOnce({
      isSuccess: false,
      errors: {
        avatarUrl: [validationMessage],
      },
      message: MESSAGE_CODES.VALIDATION_ERROR,
    })

    const submit = screen.getByRole('button')
    await userEvent.click(submit)

    expect(await screen.findByText(validationMessage)).toBeInTheDocument()
  })
})
