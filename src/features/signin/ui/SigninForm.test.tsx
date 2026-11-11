import { screen } from '@testing-library/react'
import { useActionState } from 'react'

import { SIGNIN_FORM } from '@/features/signin/lib/constants'
import { TEST_IDS } from '@/shared/config/testids'
import { expectInputsToBeDisabled } from '@/test/helpers/expectInputsToBeDisabled'
import { expectInputsToBeEnabled } from '@/test/helpers/expectInputsToBeEnabled'
import { renderWithProviders } from '@/test/helpers/renderWithProviders'

import { SigninForm } from './SigninForm'

vi.mock('react', { spy: true })

describe('SigninForm', () => {
  it('should render enabled elements by default with default values', () => {
    renderWithProviders(<SigninForm />)

    expectInputsToBeEnabled(Object.values(SIGNIN_FORM))
    expect(screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT)).toBeEnabled()
  })
  it('should disable elements on request', () => {
    vi.mocked(useActionState).mockReturnValueOnce([{}, vi.fn(), true])
    renderWithProviders(<SigninForm />)

    expectInputsToBeDisabled(Object.values(SIGNIN_FORM))
    expect(screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT)).toBeDisabled()
  })
})
