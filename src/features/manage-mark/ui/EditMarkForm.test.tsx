import { screen } from '@testing-library/react'
import { useActionState } from 'react'

import { EDIT_MARK_FORM } from '@/features/manage-mark/lib/constants'
import { TEST_IDS } from '@/shared/config/testids'
import { expectInputsToBeDisabled } from '@/test/helpers/expectInputsToBeDisabled'
import { expectInputsToBeEnabled } from '@/test/helpers/expectInputsToBeEnabled'
import { expectInputsToHaveValues } from '@/test/helpers/expectInputsToHaveValues'
import { renderWithProviders } from '@/test/helpers/renderWithProviders'

import { EditMarkForm } from './EditMarkForm'

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
})
