import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useParams } from 'next/navigation'
import { useActionState } from 'react'

import { Providers } from '@/app/[locale]/_providers/Providers'
import { CREATE_MARK_FORM } from '@/features/create-mark/lib/constants'
import { useMetaStateContext } from '@/features/create-mark/model/MetaContext'
import { TEST_IDS } from '@/shared/config/testids'
import { expectInputsToBeDisabled } from '@/test/helpers/expectInputsToBeDisabled'
import { expectInputsToBeEnabled } from '@/test/helpers/expectInputsToBeEnabled'
import { expectInputsToHaveValues } from '@/test/helpers/expectInputsToHaveValues'
import { renderWithProviders } from '@/test/helpers/renderWithProviders'

import { CreateMarkForm } from './CreateMarkForm'

vi.mock('../model/MetaContext')
vi.mock('next/navigation')
vi.mock('react', { spy: true })

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
  it('should set values from meta context ', () => {
    vi.mocked(useMetaStateContext).mockReturnValue(defaultData)

    renderWithProviders(<CreateMarkForm />)

    expectInputsToHaveValues({
      [CREATE_MARK_FORM.URL]: defaultData.url,
      [CREATE_MARK_FORM.TITLE]: defaultData.title,
      [CREATE_MARK_FORM.DESCRIPTION]: defaultData.description,
      [CREATE_MARK_FORM.LOGO_URL]: defaultData.logoUrl,
    })
  })
  it('should set empty strings when received undefined from meta context ', () => {
    vi.mocked(useMetaStateContext).mockReturnValue({
      url: undefined,
      title: undefined,
      description: undefined,
      logoUrl: undefined,
    })

    renderWithProviders(<CreateMarkForm />)

    expectInputsToHaveValues({
      [CREATE_MARK_FORM.URL]: '',
      [CREATE_MARK_FORM.TITLE]: '',
      [CREATE_MARK_FORM.DESCRIPTION]: '',
      [CREATE_MARK_FORM.LOGO_URL]: '',
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
})
