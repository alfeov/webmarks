import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { loadMetaAction } from '@/features/create-mark/api/loadMetaAction'
import { LOAD_META_FORM } from '@/features/create-mark/lib/constants'
import {
  MetaProvider,
  useMetaActionContext,
} from '@/features/create-mark/model/MetaContext'
import { MESSAGE_CODES } from '@/shared/api/types'
import { TEST_IDS } from '@/shared/config/testids'
import { paste } from '@/shared/lib/utils/paste'
import { showToast } from '@/shared/lib/utils/showToast'
import { expectFieldsToBeEnabled } from '@/test/helpers/expectFieldsToBeEnabled'
import { expectFieldsToHaveValues } from '@/test/helpers/expectFieldsToHaveValues'
import { renderWithProviders } from '@/test/helpers/renderWithProviders'

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

    expectFieldsToBeEnabled(Object.values(LOAD_META_FORM))
    expectFieldsToHaveValues({
      [LOAD_META_FORM.URL]: '',
    })

    expect(screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.PASTE)).toBeEnabled()
    expect(screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.LOAD)).toBeEnabled()
  })
  it('should paste url to input from clipboard on paste button click', async () => {
    renderWithProviders(
      <MetaProvider>
        <LoadMetaForm />
      </MetaProvider>,
    )

    const clipText = 'clipText'
    vi.mocked(paste).mockResolvedValueOnce({ clipText })

    const pasteBtn = screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.PASTE)
    await userEvent.click(pasteBtn)

    expectFieldsToHaveValues({
      [LOAD_META_FORM.URL]: clipText,
    })
  })
  it('should call showToast with corresponding arguments on paste error', async () => {
    renderWithProviders(
      <MetaProvider>
        <LoadMetaForm />
      </MetaProvider>,
    )

    vi.mocked(paste).mockResolvedValueOnce({ error: 'PASTE_ERROR' })

    const pasteBtn = screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.PASTE)
    await userEvent.click(pasteBtn)

    expectFieldsToHaveValues({
      [LOAD_META_FORM.URL]: '',
    })
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

    expectFieldsToHaveValues({
      [LOAD_META_FORM.URL]: url,
    })
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

    const loadBtn = screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.LOAD)
    await userEvent.click(loadBtn)

    await waitFor(() => {
      expect(loadMetaAction).toHaveBeenCalled()
      expect(setMetadata).toHaveBeenCalledWith(metadata)
    })
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
        loadUrl: [validationMessage],
      },
      message: MESSAGE_CODES.VALIDATION_ERROR,
    })

    const loadBtn = screen.getByTestId(TEST_IDS.CLICKABLE.BUTTON.LOAD)
    await userEvent.click(loadBtn)

    expect(loadMetaAction).toHaveBeenCalled()
    expect(setMetadata).not.toHaveBeenCalled()

    expect(screen.getByTestId(`${LOAD_META_FORM.URL}-error`)).toHaveTextContent(
      validationMessage,
    )
  })
})
