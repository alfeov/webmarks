import { screen } from '@testing-library/react'
import { useActionState } from 'react'

import { CREATE_TAG_FORM } from '@/features/create-tag/lib/constants'
import { TEST_IDS } from '@/shared/config/testids'
import { expectInputsToBeDisabled } from '@/test/helpers/expectInputsToBeDisabled'
import { expectInputsToBeEnabled } from '@/test/helpers/expectInputsToBeEnabled'
import { renderWithProviders } from '@/test/helpers/renderWithProviders'

import { CreateTagForm } from './CreateTagForm'

vi.mock('react', { spy: true })

describe('CreateTagForm', () => {
  it('should render enabled elements by default with default values', () => {
    renderWithProviders(<CreateTagForm />)

    expectInputsToBeEnabled(Object.values(CREATE_TAG_FORM))
    expect(screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT)).toBeEnabled()
  })
  it('should disable elements on request', () => {
    vi.mocked(useActionState).mockReturnValueOnce([{}, vi.fn(), true])
    renderWithProviders(<CreateTagForm />)

    expectInputsToBeDisabled(Object.values(CREATE_TAG_FORM))
    expect(screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT)).toBeDisabled()
  })
})
