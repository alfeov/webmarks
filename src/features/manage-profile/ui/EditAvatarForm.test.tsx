import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useActionState } from 'react'

import { editAvatarAction } from '@/features/manage-profile/api/editAvatarAction'
import { EDIT_AVATAR_FORM } from '@/features/manage-profile/lib/constants'
import { MESSAGE_CODES } from '@/shared/api/constants'
import { TEST_IDS } from '@/shared/config/testids'
import { expectInputsToBeDisabled } from '@/test/helpers/expectInputsToBeDisabled'
import { expectInputsToBeEnabled } from '@/test/helpers/expectInputsToBeEnabled'
import { expectInputsToHaveValues } from '@/test/helpers/expectInputsToHaveValues'
import { renderWithProviders } from '@/test/helpers/renderWithProviders'

import { EditAvatarForm } from './EditAvatarForm'

vi.mock('../api/editAvatarAction')
vi.mock('react', { spy: true })

const defaultData = {
  avatarUrl: 'https://some-url.png',
}

describe('CreateTagForm', () => {
  it('should render enabled elements by default with default values', () => {
    renderWithProviders(<EditAvatarForm {...defaultData} />)

    expectInputsToBeEnabled(Object.values(EDIT_AVATAR_FORM))
    expectInputsToHaveValues({
      [EDIT_AVATAR_FORM.AVATAR_URL]: defaultData.avatarUrl,
    })
    expect(screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT)).toBeEnabled()
  })
  it('should disable elements on request', () => {
    vi.mocked(useActionState).mockReturnValueOnce([{}, vi.fn(), true])
    renderWithProviders(<EditAvatarForm {...defaultData} />)

    expectInputsToBeDisabled(Object.values(EDIT_AVATAR_FORM))
    expect(screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT)).toBeDisabled()
  })
  it('should render empty string as default value if avatarUrl is null', () => {
    renderWithProviders(<EditAvatarForm avatarUrl={null} />)

    expectInputsToHaveValues({
      [EDIT_AVATAR_FORM.AVATAR_URL]: '',
    })
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

    const submit = screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT)
    await userEvent.click(submit)

    expect(await screen.findByText(validationMessage)).toBeInTheDocument()
  })
})
