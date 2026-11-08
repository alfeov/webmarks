import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useActionState } from 'react'

import { deleteMarkAction } from '@/features/manage-mark/api/deleteMarkAction'
import { MESSAGE_CODES } from '@/shared/api/types'
import { TEST_IDS } from '@/shared/config/testids'
import { renderWithProviders } from '@/test/helpers/renderWithProviders'

import { DeleteMarkForm } from './DeleteMarkForm'

vi.mock('../api/deleteMarkAction')
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
  it('should call deleteMarkAction with markId', async () => {
    renderWithProviders(<DeleteMarkForm markId={defaultMarkId} />)

    vi.mocked(deleteMarkAction).mockResolvedValueOnce({
      isSuccess: true,
      message: MESSAGE_CODES.MARK_DELETE_SUCCESS,
    })

    const submit = screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.SUBMIT)
    await userEvent.click(submit)

    expect(deleteMarkAction).toHaveBeenCalledWith(
      defaultMarkId,
      expect.any(Object),
      expect.any(Object),
    )
  })
})
