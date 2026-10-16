import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { MESSAGE_CODES } from '@/shared/api/types'
import { renderWithProviders } from '@/test/renderWithProviders'

import { editTagAction } from '../api/editTagAction'
import { EditTagForm } from './EditTagForm'

vi.mock('../api/editTagAction')

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

    expect(screen.getByPlaceholderText(defaultData.title)).toBeEnabled()
    expect(screen.getByRole('button')).toBeEnabled()
  })
  it('should call Action with tag id received from props', async () => {
    renderWithProviders(<EditTagForm {...defaultData} />)

    vi.mocked(editTagAction).mockResolvedValueOnce({
      isSuccess: true,
      message: MESSAGE_CODES.TAG_EDIT_SUCCESS,
    })

    const submit = screen.getByRole('button')
    await userEvent.click(submit)

    expect(editTagAction).toHaveBeenCalledWith(
      defaultData.id,
      expect.any(Object),
      expect.any(Object),
    )
  })
  it('should show validation error if received error', async () => {
    renderWithProviders(<EditTagForm {...defaultData} />)

    const validationMessage = 'SOME_ERROR_CODE'
    vi.mocked(editTagAction).mockResolvedValueOnce({
      isSuccess: false,
      errors: {
        title: [validationMessage],
      },
      message: MESSAGE_CODES.VALIDATION_ERROR,
    })

    const submit = screen.getByRole('button')
    await userEvent.click(submit)

    expect(await screen.findAllByText(validationMessage)).toHaveLength(1)
  })
})
