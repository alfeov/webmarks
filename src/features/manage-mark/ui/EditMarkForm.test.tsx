import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useActionState } from 'react'

import { editMarkAction } from '@/features/manage-mark/api/editMarkAction'
import { EDIT_MARK_FORM } from '@/features/manage-mark/lib/constants'
import { MESSAGE_CODES } from '@/shared/api/constants'
import { TEST_IDS } from '@/shared/config/testids'
import { expectInputsToBeDisabled } from '@/test/helpers/expectInputsToBeDisabled'
import { expectInputsToBeEnabled } from '@/test/helpers/expectInputsToBeEnabled'
import { expectInputsToHaveValues } from '@/test/helpers/expectInputsToHaveValues'
import { renderWithProviders } from '@/test/helpers/renderWithProviders'

import { EditMarkForm } from './EditMarkForm'

vi.mock('../api/editMarkAction')
vi.mock('react', { spy: true })

const defaultData = {
  id: '1',
  url: 'https://some-url.com',
  title: 'Vercel',
  description: 'Some cool description',
  logoUrl: 'https://logo-url.png',
  pinned: true,
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

describe('EditMarkForm', () => {
  it('should render enabled elements by default with default values', () => {
    renderWithProviders(<EditMarkForm {...defaultData} />)

    expectInputsToBeEnabled(Object.values(EDIT_MARK_FORM))
    expect(screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT)).toBeEnabled()

    expectInputsToHaveValues({
      [EDIT_MARK_FORM.URL]: defaultData.url,
      [EDIT_MARK_FORM.TITLE]: defaultData.title,
      [EDIT_MARK_FORM.DESCRIPTION]: defaultData.description,
      [EDIT_MARK_FORM.LOGO_URL]: defaultData.logoUrl,
    })
  })
  it('should disable elements on request', () => {
    vi.mocked(useActionState).mockReturnValueOnce([{}, vi.fn(), true])
    renderWithProviders(<EditMarkForm {...defaultData} />)

    expectInputsToBeDisabled(Object.values(EDIT_MARK_FORM))
    expect(screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT)).toBeDisabled()
  })
  it('should call Action with mark id received from props', async () => {
    renderWithProviders(<EditMarkForm {...defaultData} />)

    vi.mocked(editMarkAction).mockResolvedValueOnce({
      isSuccess: true,
      message: MESSAGE_CODES.MARK_EDIT_SUCCESS,
    })

    const submit = screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT)
    await userEvent.click(submit)

    expect(editMarkAction).toHaveBeenCalledWith(
      defaultData.id,
      expect.any(Object),
      expect.any(Object),
    )
  })
  it('should show validation error if received error', async () => {
    renderWithProviders(<EditMarkForm {...defaultData} />)

    const validationMessage = 'SOME_ERROR_CODE'
    vi.mocked(editMarkAction).mockResolvedValueOnce({
      isSuccess: false,
      errors: {
        url: [validationMessage],
        title: [validationMessage],
        description: [validationMessage],
        logoUrl: [validationMessage],
      },
      message: MESSAGE_CODES.VALIDATION_ERROR,
    })

    const submit = screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT)
    await userEvent.click(submit)

    expect(await screen.findAllByText(validationMessage)).toHaveLength(4)
  })
})
