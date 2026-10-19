import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { MESSAGE_CODES } from '@/shared/api/types'
import { paste } from '@/shared/lib/utils/paste'
import { showToast } from '@/shared/lib/utils/showToast'
import { renderWithProviders } from '@/test/helpers/renderWithProviders'

import { loadMetaAction } from '../api/loadMetaAction'
import { LoadMetaForm } from './LoadMetaForm'

const setMetadata = vi.fn()

vi.mock('@/shared/lib/utils/paste')
vi.mock('@/shared/lib/utils/showToast')
vi.mock('@/features/create-mark/api/loadMetaAction')
vi.mock('../model/MetaContext', async (importOriginal) => ({
  ...(await importOriginal()),
  useMetaActionContext: () => setMetadata,
}))

describe('LoadMetaForm', () => {
  it('should render enabled elements by default with default values', () => {
    renderWithProviders(<LoadMetaForm />)

    const input = screen.getByPlaceholderText(/url/i)

    expect(input).toHaveValue('')

    expect(input).toBeEnabled()
    expect(screen.getByRole('button', { name: /paste/i })).toBeEnabled()
    expect(screen.getByRole('button', { name: /load/i })).toBeEnabled()
  })
  it('should paste url to input from clipboard on paste button click', async () => {
    renderWithProviders(<LoadMetaForm />)

    const clipText = 'clipText'
    vi.mocked(paste).mockResolvedValueOnce({ clipText })

    const pasteBtn = screen.getByRole('button', { name: /paste/i })
    await userEvent.click(pasteBtn)

    expect(screen.getByPlaceholderText(/url/i)).toHaveValue(clipText)
  })
  it('should call showToast with corresponding arguments on paste error', async () => {
    renderWithProviders(<LoadMetaForm />)

    vi.mocked(paste).mockResolvedValueOnce({ error: 'PASTE_ERROR' })

    const pasteBtn = screen.getByRole('button', { name: /paste/i })
    await userEvent.click(pasteBtn)

    expect(screen.getByPlaceholderText(/url/i)).toHaveValue('')
    expect(showToast).toHaveBeenCalledWith('errorTitle', 'PASTE_ERROR', false)
  })
  it('should call loadMetadataAction and set in with setMetadata fn when load button clicked', async () => {
    renderWithProviders(<LoadMetaForm />)

    const metadata = {
      url: 'https://some-url.com',
      title: 'Title',
      description: 'Some cool description',
      logoUrl: 'https:/logo-url.png',
    }
    vi.mocked(loadMetaAction).mockResolvedValueOnce({
      isSuccess: true,
      data: metadata,
      message: MESSAGE_CODES.LOAD_META_SUCCESS,
    })

    const loadBtn = screen.getByRole('button', { name: /load/i })
    await userEvent.click(loadBtn)

    expect(loadMetaAction).toHaveBeenCalled()
    expect(setMetadata).toHaveBeenCalledWith(metadata)
  })
  it('should not call setMetadata and show validation error when received error', async () => {
    renderWithProviders(<LoadMetaForm />)

    const validationMessage = 'SOME_ERROR_CODE'
    vi.mocked(loadMetaAction).mockResolvedValueOnce({
      isSuccess: false,
      errors: {
        url: [validationMessage],
      },
      message: MESSAGE_CODES.VALIDATION_ERROR,
    })

    const loadBtn = screen.getByRole('button', { name: /load/i })
    await userEvent.click(loadBtn)

    expect(loadMetaAction).toHaveBeenCalled()
    expect(setMetadata).not.toHaveBeenCalled()

    expect(screen.getByRole('alert')).toHaveTextContent(validationMessage)
  })
})
