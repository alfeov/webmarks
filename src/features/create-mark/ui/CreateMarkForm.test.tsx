import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useParams } from 'next/navigation'
import { useActionState } from 'react'

import { Providers } from '@/app/[locale]/_providers/Providers'
import { createMarkAction } from '@/features/create-mark/api/createMarkAction'
import { CREATE_MARK_FORM } from '@/features/create-mark/lib/constants'
import { useMetaStateContext } from '@/features/create-mark/model/MetaContext'
import { MESSAGE_CODES } from '@/shared/api/constants'
import { TEST_IDS } from '@/shared/config/testids'
import { expectInputsToBeDisabled } from '@/test/helpers/expectInputsToBeDisabled'
import { expectInputsToBeEnabled } from '@/test/helpers/expectInputsToBeEnabled'
import { expectInputsToHaveValues } from '@/test/helpers/expectInputsToHaveValues'
import { renderWithProviders } from '@/test/helpers/renderWithProviders'

import { CreateMarkForm } from './CreateMarkForm'

vi.mock('../model/MetaContext')
vi.mock('../api/createMarkAction')
vi.mock('next/navigation')
vi.mock('react', { spy: true })

const tagId = '1'

const defaultData = {
  url: 'https://some-url.com',
  title: 'Vercel',
  description: 'Some cool description',
  logoUrl: 'https://logo-url.png',
}

describe('CreateMarkForm', () => {
  beforeEach(() => {
    vi.mocked(useParams).mockReturnValue({})
    vi.mocked(useMetaStateContext).mockReturnValue({})
  })

  it('should render enabled elements by default with default values', () => {
    renderWithProviders(<CreateMarkForm />)

    expectInputsToBeEnabled(Object.values(CREATE_MARK_FORM))
    expect(screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT)).toBeEnabled()

    expectInputsToHaveValues({
      [CREATE_MARK_FORM.URL]: '',
      [CREATE_MARK_FORM.TITLE]: '',
      [CREATE_MARK_FORM.DESCRIPTION]: '',
      [CREATE_MARK_FORM.LOGO_URL]: '',
    })
  })
  it('should disable elements on request', () => {
    vi.mocked(useActionState).mockReturnValue([{}, vi.fn(), true])
    renderWithProviders(<CreateMarkForm />)

    expectInputsToBeDisabled(Object.values(CREATE_MARK_FORM))
    expect(screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT)).toBeDisabled()

    vi.mocked(useActionState).mockRestore()
  })
  it('should set values from meta context when it received', () => {
    vi.mocked(useMetaStateContext).mockReturnValue(defaultData)

    renderWithProviders(<CreateMarkForm />)

    expectInputsToHaveValues({
      [CREATE_MARK_FORM.URL]: defaultData.url,
      [CREATE_MARK_FORM.TITLE]: defaultData.title,
      [CREATE_MARK_FORM.DESCRIPTION]: defaultData.description,
      [CREATE_MARK_FORM.LOGO_URL]: defaultData.logoUrl,
    })
  })
  it('should keep user input and fill only untouched fields when meta arrives', async () => {
    const { rerender } = renderWithProviders(<CreateMarkForm />)

    const userInput = 'User Input'
    await userEvent.type(
      screen.getByTestId(`${CREATE_MARK_FORM.URL}-input`),
      userInput,
    )
    await userEvent.type(
      screen.getByTestId(`${CREATE_MARK_FORM.DESCRIPTION}-input`),
      userInput,
    )

    vi.mocked(useMetaStateContext).mockReturnValue(defaultData)

    rerender(
      <Providers>
        <CreateMarkForm />
      </Providers>,
    )

    expectInputsToHaveValues({
      [CREATE_MARK_FORM.URL]: userInput,
      [CREATE_MARK_FORM.TITLE]: defaultData.title,
      [CREATE_MARK_FORM.DESCRIPTION]: userInput,
      [CREATE_MARK_FORM.LOGO_URL]: defaultData.logoUrl,
    })
  })
  it('should call createMarkAction with tag id when it present in params', async () => {
    vi.mocked(useParams).mockReturnValue({ tagId })

    renderWithProviders(<CreateMarkForm />)

    vi.mocked(createMarkAction).mockResolvedValueOnce({
      isSuccess: true,
      message: MESSAGE_CODES.MARK_CREATE_SUCCESS,
    })

    const submit = screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT)
    await userEvent.click(submit)

    expect(createMarkAction).toHaveBeenCalledWith(
      tagId,
      expect.any(Object),
      expect.any(Object),
    )
  })
  it('should show validation error if received error', async () => {
    renderWithProviders(<CreateMarkForm />)

    const validationMessage = 'SOME_ERROR_CODE'
    vi.mocked(createMarkAction).mockResolvedValueOnce({
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

    expect(createMarkAction).toHaveBeenCalledWith(
      undefined,
      expect.any(Object),
      expect.any(Object),
    )
    expect(await screen.findAllByText(validationMessage)).toHaveLength(4)
  })
})
