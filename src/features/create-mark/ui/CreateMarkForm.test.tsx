import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { MESSAGE_CODES } from '@/shared/api/types'
import { AllProviders, renderWithProviders } from '@/test/renderWithProviders'

import { createMarkAction } from '../api/createMarkAction'
import { CreateMarkForm } from './CreateMarkForm'

const { useMetaStateContext } = vi.hoisted(() => ({
  useMetaStateContext: vi.fn(),
}))

vi.mock('../model/MetaContext', async (importOriginal) => ({
  ...(await importOriginal()),
  useMetaStateContext,
}))
vi.mock('../api/createMarkAction')

const tagId = '1'
const tagTitle = 'Vercel'

const defaultData = {
  url: 'https://some-url.com',
  title: 'Vercel',
  description: 'Some cool description',
  logoUrl: 'https://logo-url.png',
}

describe('CreateMarkForm', () => {
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
    vi.mocked(useMetaStateContext).mockReturnValueOnce(defaultData)

    renderWithProviders(
      <CreateMarkForm currentTagId={tagId} currentTagTitle={tagTitle} />,
    )

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
    vi.mocked(useMetaStateContext).mockReturnValueOnce({
      url: undefined,
      title: undefined,
      description: undefined,
      logoUrl: undefined,
    })

    renderWithProviders(
      <CreateMarkForm currentTagId={tagId} currentTagTitle={tagTitle} />,
    )

    expect(screen.getByPlaceholderText(/webmarks.com/i)).toHaveValue('')
    expect(screen.getByPlaceholderText('WebMark')).toHaveValue('')
    expect(screen.getByPlaceholderText(/description/i)).toHaveValue('')
    expect(screen.getByPlaceholderText(/logo.com/i)).toHaveValue('')
  })
  it('should keep user input and fill only untouched fields when meta arrives', async () => {
    const { rerender } = renderWithProviders(
      <CreateMarkForm currentTagId={tagId} currentTagTitle={tagTitle} />,
    )

    const userInput = 'User Input'
    await userEvent.type(
      screen.getByPlaceholderText(/webmarks.com/i),
      userInput,
    )
    await userEvent.type(screen.getByPlaceholderText(/description/i), userInput)

    vi.mocked(useMetaStateContext).mockReturnValueOnce(defaultData)

    rerender(
      <AllProviders>
        <CreateMarkForm currentTagId={tagId} currentTagTitle={tagTitle} />
      </AllProviders>,
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
  it('should display default tag corresponding to page params (received from props)', () => {
    renderWithProviders(
      <CreateMarkForm currentTagId={tagId} currentTagTitle={tagTitle} />,
    )

    expect(screen.getByTestId('current-tag')).toHaveTextContent(tagTitle)
  })
  it('should not display default tag when it not received from props', () => {
    renderWithProviders(<CreateMarkForm />)

    expect(screen.queryByTestId('current-tag')).not.toBeInTheDocument()
  })
  it('should call createMarkAction with defaultTagId received from props', async () => {
    renderWithProviders(
      <CreateMarkForm currentTagId={tagId} currentTagTitle={tagTitle} />,
    )

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
