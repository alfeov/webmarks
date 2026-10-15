import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { MESSAGE_CODES } from '@/shared/api/types'
import { renderWithProviders } from '@/test/renderWithProviders'

import { editMarkAction } from '../api/editMarkAction'
import { EditMarkForm } from './EditMarkForm'

vi.mock('../api/editMarkAction')

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

    expect(screen.getByPlaceholderText(/webmarks.com/i)).toBeEnabled()
    expect(screen.getByPlaceholderText('WebMark')).toBeEnabled()
    expect(screen.getByPlaceholderText(/description/i)).toBeEnabled()
    expect(screen.getByPlaceholderText(/logo.com/i)).toBeEnabled()
    expect(screen.getByRole('button')).toBeEnabled()

    expect(screen.getByPlaceholderText(/webmarks.com/i)).toHaveValue(
      defaultData.url,
    )
    expect(screen.getByPlaceholderText('WebMark')).toHaveValue(
      defaultData.title,
    )
    expect(screen.getByPlaceholderText(/description/i)).toHaveValue(
      defaultData.description,
    )
    expect(screen.getByPlaceholderText(/logo.com/i)).toHaveValue(
      defaultData.logoUrl,
    )
  })
  it('should call Action with mark id received from props', async () => {
    renderWithProviders(<EditMarkForm {...defaultData} />)

    vi.mocked(editMarkAction).mockResolvedValueOnce({
      isSuccess: true,
      message: MESSAGE_CODES.MARK_EDIT_SUCCESS,
    })

    const submit = screen.getByRole('button')
    await userEvent.click(submit)

    expect(editMarkAction).toHaveBeenCalledWith(
      defaultData.id,
      expect.any(Object),
      expect.any(Object),
    )
  })
  it('should show validation error if received error', async () => {
    renderWithProviders(<EditMarkForm {...defaultData} />)

    const validationMessage = 'SOME_ERROR_CODE'
    vi.mocked(editMarkAction).mockResolvedValueOnce({
      isSuccess: false,
      errors: {
        url: [validationMessage],
        title: [validationMessage],
        description: [validationMessage],
        logoUrl: [validationMessage],
      },
      message: MESSAGE_CODES.VALIDATION_ERROR,
    })

    const submit = screen.getByRole('button')
    await userEvent.click(submit)

    expect(await screen.findAllByText(validationMessage)).toHaveLength(4)
  })
})
