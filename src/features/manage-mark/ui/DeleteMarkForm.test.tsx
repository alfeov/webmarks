import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { MESSAGE_CODES } from '@/shared/api/types'
import { renderWithProviders } from '@/test/renderWithProviders'

import { deleteMarkAction } from '../api/deleteMarkAction'
import { DeleteMarkForm } from './DeleteMarkForm'

vi.mock('../api/deleteMarkAction')

const defaultMarkId = '1'

describe('DeleteMarkForm', () => {
  it('should render enabled elements by default with default values', () => {
    renderWithProviders(<DeleteMarkForm markId={defaultMarkId} />)

    expect(screen.getByRole('button')).toBeEnabled()
  })
  it('should call deleteMarkAction with markId', async () => {
    renderWithProviders(<DeleteMarkForm markId={defaultMarkId} />)

    vi.mocked(deleteMarkAction).mockResolvedValueOnce({
      isSuccess: true,
      message: MESSAGE_CODES.MARK_DELETE_SUCCESS,
    })

    const submit = screen.getByRole('button')
    await userEvent.click(submit)

    expect(deleteMarkAction).toHaveBeenCalledWith(
      defaultMarkId,
      expect.any(Object),
      expect.any(Object),
    )
  })
})
