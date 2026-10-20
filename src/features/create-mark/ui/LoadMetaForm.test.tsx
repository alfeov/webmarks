import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { MESSAGE_CODES } from '@/shared/api/types'
import { paste } from '@/shared/lib/utils/paste'
import { showToast } from '@/shared/lib/utils/showToast'
import { renderWithProviders } from '@/test/helpers/renderWithProviders'

import { loadMetaAction } from '../api/loadMetaAction'
import { MetaProvider, useMetaActionContext } from '../model/MetaContext'
import { LoadMetaForm } from './LoadMetaForm'

vi.mock('@/shared/lib/utils/paste')
vi.mock('@/shared/lib/utils/showToast')
vi.mock('@/features/create-mark/api/loadMetaAction')
vi.mock('../model/MetaContext', { spy: true })

describe('LoadMetaForm', () => {
  it('should render enabled elements by default with default values', () => {
    renderWithProviders(
      <MetaProvider>
        <LoadMetaForm />
      </MetaProvider>,
    )

    const input = screen.getByPlaceholderText(/url/i)

    expect(input).toHaveValue('')

    expect(input).toBeEnabled()
    expect(screen.getByRole('button', { name: /paste/i })).toBeEnabled()
    expect(screen.getByRole('button', { name: /load/i })).toBeEnabled()
  })
  it('should paste url to input from clipboard on paste button click', async () => {
    renderWithProviders(
      <MetaProvider>
        <LoadMetaForm />
      </MetaProvider>,
    )

    const clipText = 'clipText'
    vi.mocked(paste).mockResolvedValueOnce({ clipText })

    const pasteBtn = screen.getByRole('button', { name: /paste/i })
    await userEvent.click(pasteBtn)

    expect(screen.getByPlaceholderText(/url/i)).toHaveValue(clipText)
  })
  it('should call showToast with corresponding arguments on paste error', async () => {
    renderWithProviders(
      <MetaProvider>
        <LoadMetaForm />
      </MetaProvider>,
    )

    vi.mocked(paste).mockResolvedValueOnce({ error: 'PASTE_ERROR' })

    const pasteBtn = screen.getByRole('button', { name: /paste/i })
    await userEvent.click(pasteBtn)

    expect(screen.getByPlaceholderText(/url/i)).toHaveValue('')
    expect(showToast).toHaveBeenCalledWith('errorTitle', 'PASTE_ERROR', false)
  })
  it('should set url on input type', async () => {
    renderWithProviders(
      <MetaProvider>
        <LoadMetaForm />
      </MetaProvider>,
    )

    const url = 'https://some-url.com'
    const input = screen.getByPlaceholderText(/url/i)
    await userEvent.type(input, url)

    expect(screen.getByPlaceholderText(/url/i)).toHaveValue(url)
  })
  it('should call loadMetadataAction and set it with setMetadata fn when load button clicked', async () => {
    const setMetadata = vi.fn()
    vi.mocked(useMetaActionContext).mockReturnValue(setMetadata)

    renderWithProviders(
      <MetaProvider>
        <LoadMetaForm />
      </MetaProvider>,
    )

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
    const setMetadata = vi.fn()
    vi.mocked(useMetaActionContext).mockReturnValue(setMetadata)

    renderWithProviders(
      <MetaProvider>
        <LoadMetaForm />
      </MetaProvider>,
    )

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
