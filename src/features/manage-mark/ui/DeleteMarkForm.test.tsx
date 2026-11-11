import { screen } from '@testing-library/react'
import { useActionState } from 'react'

import { TEST_IDS } from '@/shared/config/testids'
import { renderWithProviders } from '@/test/helpers/renderWithProviders'

import { DeleteMarkForm } from './DeleteMarkForm'

vi.mock('react', { spy: true })

const defaultMarkId = '1'

describe('DeleteMarkForm', () => {
  it('should render enabled elements by default', () => {
    renderWithProviders(<DeleteMarkForm markId={defaultMarkId} />)

    expect(screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT)).toBeEnabled()
  })
  it('should disable elements on request', () => {
    vi.mocked(useActionState).mockReturnValueOnce([{}, vi.fn(), true])
    renderWithProviders(<DeleteMarkForm markId={defaultMarkId} />)

    expect(screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT)).toBeDisabled()
  })
})
