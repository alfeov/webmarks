import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { createTagAction } from '@/features/create-tag/api/createTagAction'
import { CREATE_TAG_FORM } from '@/features/create-tag/lib/constants'
import { MESSAGE_CODES } from '@/shared/api/types'
import { TEST_IDS } from '@/shared/config/testids'
import { expectFieldsToBeEnabled } from '@/test/helpers/expectFieldsToBeEnabled'
import { renderWithProviders } from '@/test/helpers/renderWithProviders'

import { CreateTagForm } from './CreateTagForm'

vi.mock('../api/createTagAction')

describe('CreateTagForm', () => {
  it('should render enabled elements by default with default values', () => {
    renderWithProviders(<CreateTagForm />)

    expectFieldsToBeEnabled(Object.values(CREATE_TAG_FORM))
    expect(screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT)).toBeEnabled()
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

    const submit = screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT)
    await userEvent.click(submit)

    expect(await screen.findByText(validationMessage)).toBeInTheDocument()
  })
})
