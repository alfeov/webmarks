import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { MESSAGE_CODES } from '@/shared/api/types'
import { renderWithProviders } from '@/test/renderWithProviders'

import { createTagAction } from '../api/createTagAction'
import { CreateTagForm } from './CreateTagForm'

vi.mock('../api/createTagAction')

describe('CreateTagForm', () => {
  it('should render enabled elements by default with default values', () => {
    renderWithProviders(<CreateTagForm />)

    expect(
      screen.getByPlaceholderText(/fields.title.placeholder/i),
    ).toBeEnabled()
    expect(screen.getByRole('button')).toBeEnabled()
  })
  it('should show validation error if received error', async () => {
    renderWithProviders(<CreateTagForm />)

    const validationMessage = 'SOME_ERROR_CODE'
    vi.mocked(createTagAction).mockResolvedValueOnce({
      isSuccess: false,
      errors: {
        title: [validationMessage],
      },
      message: MESSAGE_CODES.VALIDATION_ERROR,
    })

    const submit = screen.getByRole('button')
    await userEvent.click(submit)

    expect(await screen.findByText(validationMessage)).toBeInTheDocument()
  })
})
