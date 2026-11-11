import { screen } from '@testing-library/react'
import { useActionState } from 'react'

import { SIGNUP_FORM } from '@/features/signup/lib/constants'
import { TEST_IDS } from '@/shared/config/testids'
import { expectInputsToBeDisabled } from '@/test/helpers/expectInputsToBeDisabled'
import { expectInputsToBeEnabled } from '@/test/helpers/expectInputsToBeEnabled'
import { renderWithProviders } from '@/test/helpers/renderWithProviders'

import { SignupForm } from './SignupForm'

vi.mock('react', { spy: true })

describe('SignupForm', () => {
  it('should render enabled elements by default with default values', () => {
    renderWithProviders(<SignupForm />)

    expectInputsToBeEnabled(Object.values(SIGNUP_FORM))
    expect(screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT)).toBeEnabled()
  })
  it('should disable elements on request', () => {
    vi.mocked(useActionState).mockReturnValueOnce([{}, vi.fn(), true])
    renderWithProviders(<SignupForm />)

    expectInputsToBeDisabled(Object.values(SIGNUP_FORM))
    expect(screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT)).toBeDisabled()
  })
})
