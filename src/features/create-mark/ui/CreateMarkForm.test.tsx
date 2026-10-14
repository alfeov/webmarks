import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithProviders } from '@/test/renderWithProviders'

import { createMarkAction } from '../api/createMarkAction'
import { CreateMarkForm } from './CreateMarkForm'

const { useMetaStateContext } = vi.hoisted(() => ({
  useMetaStateContext: vi.fn(),
}))

vi.mock('next-intl', async (importOriginal) => ({
  ...(await importOriginal()),
  useTranslations: () => (key: string) => key,
}))
vi.mock('../model/MetaContext', async (importOriginal) => ({
  ...(await importOriginal()),
  useMetaStateContext,
}))
vi.mock('../api/createMarkAction')

const tagId = '1'
const tagTitle = 'Vercel'

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
    const url = 'https://some-url.com'
    const title = 'Vercel'
    const description = 'Some cool description'
    const logoUrl = 'https://logo-url.png'
    vi.mocked(useMetaStateContext).mockReturnValueOnce({
      url,
      title,
      description,
      logoUrl,
    })

    renderWithProviders(
      <CreateMarkForm currentTagId={tagId} currentTagTitle={tagTitle} />,
    )

    expect(screen.getByPlaceholderText(/webmarks.com/i)).toHaveValue(url)
    expect(screen.getByPlaceholderText('WebMark')).toHaveValue(title)
    expect(screen.getByPlaceholderText(/description/i)).toHaveValue(description)
    expect(screen.getByPlaceholderText(/logo.com/i)).toHaveValue(logoUrl)
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
      message: 'VALIDATION_ERROR',
    })

    const submit = screen.getByRole('button')
    await userEvent.click(submit)

    expect(createMarkAction).toHaveBeenCalledWith(
      undefined,
      expect.any(Object),
      expect.any(Object),
    )
    expect(await screen.findAllByRole('alert')).toHaveLength(4)
  })
  it('should call createMarkAction with defaultTagId received from props', async () => {
    renderWithProviders(
      <CreateMarkForm currentTagId={tagId} currentTagTitle={tagTitle} />,
    )

    const message = 'MARK_CREATE_SUCCESS'
    vi.mocked(createMarkAction).mockResolvedValueOnce({
      isSuccess: true,
      message,
    })

    const submit = screen.getByRole('button')
    await userEvent.click(submit)

    expect(createMarkAction).toHaveBeenCalledWith(
      tagId,
      expect.any(Object),
      expect.any(Object),
    )
  })
})
