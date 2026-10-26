import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useParams } from 'next/navigation'

import { Providers } from '@/app/[locale]/_providers/Providers'
import { MESSAGE_CODES } from '@/shared/api/types'
import { renderWithProviders } from '@/test/helpers/renderWithProviders'

import { createMarkAction } from '../api/createMarkAction'
import { useMetaStateContext } from '../model/MetaContext'
import { CreateMarkForm } from './CreateMarkForm'

vi.mock('../model/MetaContext')
vi.mock('../api/createMarkAction')
vi.mock('next/navigation')

const tagId = '1'

const defaultData = {
  url: 'https://some-url.com',
  title: 'Vercel',
  description: 'Some cool description',
  logoUrl: 'https://logo-url.png',
}

describe('CreateMarkForm', () => {
  beforeEach(() => {
    vi.mocked(useParams).mockReturnValue({})
    vi.mocked(useMetaStateContext).mockReturnValue({})
  })

  it('should render enabled elements by default with default values', () => {
    renderWithProviders(<CreateMarkForm />)

    expect(screen.getByPlaceholderText(/webmarks.com/i)).toBeEnabled()
    expect(screen.getByPlaceholderText('WebMark')).toBeEnabled()
    expect(screen.getByPlaceholderText(/description/i)).toBeEnabled()
    expect(screen.getByPlaceholderText(/logo.com/i)).toBeEnabled()
    expect(screen.getByRole('button')).toBeEnabled()

    expect(screen.getByPlaceholderText(/webmarks.com/i)).toHaveValue('')
    expect(screen.getByPlaceholderText('WebMark')).toHaveValue('')
    expect(screen.getByPlaceholderText(/description/i)).toHaveValue('')
    expect(screen.getByPlaceholderText(/logo.com/i)).toHaveValue('')
  })
  it('should set values from meta context when it received', () => {
    vi.mocked(useMetaStateContext).mockReturnValue(defaultData)

    renderWithProviders(<CreateMarkForm />)

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
  it('should not set values from meta context when received undefined', () => {
    renderWithProviders(<CreateMarkForm />)

    expect(screen.getByPlaceholderText(/webmarks.com/i)).toHaveValue('')
    expect(screen.getByPlaceholderText('WebMark')).toHaveValue('')
    expect(screen.getByPlaceholderText(/description/i)).toHaveValue('')
    expect(screen.getByPlaceholderText(/logo.com/i)).toHaveValue('')
  })
  it('should keep user input and fill only untouched fields when meta arrives', async () => {
    const { rerender } = renderWithProviders(<CreateMarkForm />)

    const userInput = 'User Input'
    await userEvent.type(
      screen.getByPlaceholderText(/webmarks.com/i),
      userInput,
    )
    await userEvent.type(screen.getByPlaceholderText(/description/i), userInput)

    vi.mocked(useMetaStateContext).mockReturnValue(defaultData)

    rerender(
      <Providers>
        <CreateMarkForm />
      </Providers>,
    )

    expect(screen.getByPlaceholderText(/webmarks.com/i)).toHaveValue(userInput)
    expect(screen.getByPlaceholderText('WebMark')).toHaveValue(
      defaultData.title,
    )
    expect(screen.getByPlaceholderText(/description/i)).toHaveValue(userInput)
    expect(screen.getByPlaceholderText(/logo.com/i)).toHaveValue(
      defaultData.logoUrl,
    )
  })
  it('should call createMarkAction with tag id when it present in params', async () => {
    vi.mocked(useParams).mockReturnValue({ tagId })

    renderWithProviders(<CreateMarkForm />)

    vi.mocked(createMarkAction).mockResolvedValueOnce({
      isSuccess: true,
      message: MESSAGE_CODES.MARK_CREATE_SUCCESS,
    })

    const submit = screen.getByRole('button')
    await userEvent.click(submit)

    expect(createMarkAction).toHaveBeenCalledWith(
      tagId,
      expect.any(Object),
      expect.any(Object),
    )
  })
  it('should show validation error if received error', async () => {
    renderWithProviders(<CreateMarkForm />)

    const validationMessage = 'SOME_ERROR_CODE'
    vi.mocked(createMarkAction).mockResolvedValueOnce({
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

    expect(createMarkAction).toHaveBeenCalledWith(
      undefined,
      expect.any(Object),
      expect.any(Object),
    )
    expect(await screen.findAllByText(validationMessage)).toHaveLength(4)
  })
})
