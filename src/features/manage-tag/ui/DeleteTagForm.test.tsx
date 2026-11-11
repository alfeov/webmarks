import { screen } from '@testing-library/react'
import { useParams } from 'next/navigation'
import { useActionState } from 'react'

import { TEST_IDS } from '@/shared/config/testids'
import { renderWithProviders } from '@/test/helpers/renderWithProviders'

import { DeleteTagForm } from './DeleteTagForm'

vi.mock('next/navigation')
vi.mock('react', { spy: true })

const defaultTagId = '1'

describe('DeleteTagForm', () => {
  beforeEach(() => {
    vi.mocked(useParams).mockReturnValue({})
  })

  it('should render enabled elements by default', () => {
    renderWithProviders(<DeleteTagForm tagId={defaultTagId} />)

    expect(screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT)).toBeEnabled()
  })
  it('should disable elements on request', () => {
    vi.mocked(useActionState).mockReturnValueOnce([{}, vi.fn(), true])
    renderWithProviders(<DeleteTagForm tagId={defaultTagId} />)

    expect(screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT)).toBeDisabled()
  })
})
