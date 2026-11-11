import { screen } from '@testing-library/react'
import { useActionState } from 'react'

import { EDIT_TAG_FORM } from '@/features/manage-tag/lib/constants'
import { TEST_IDS } from '@/shared/config/testids'
import { expectInputsToBeDisabled } from '@/test/helpers/expectInputsToBeDisabled'
import { expectInputsToBeEnabled } from '@/test/helpers/expectInputsToBeEnabled'
import { renderWithProviders } from '@/test/helpers/renderWithProviders'

import { EditTagForm } from './EditTagForm'

vi.mock('../api/editTagAction')
vi.mock('react', { spy: true })

const defaultData = {
  id: '1',
  title: 'Some tag title',
  updatedAt: new Date(),
  createdAt: new Date(),
  userId: '1',
}

describe('EditTagForm', () => {
  it('should render enabled elements by default with default values', () => {
    renderWithProviders(<EditTagForm {...defaultData} />)

    expectInputsToBeEnabled(Object.values(EDIT_TAG_FORM))
    expect(screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT)).toBeEnabled()
  })
  it('should disable elements on request', () => {
    vi.mocked(useActionState).mockReturnValueOnce([{}, vi.fn(), true])
    renderWithProviders(<EditTagForm {...defaultData} />)

    expectInputsToBeDisabled(Object.values(EDIT_TAG_FORM))
    expect(screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT)).toBeDisabled()
  })
})
