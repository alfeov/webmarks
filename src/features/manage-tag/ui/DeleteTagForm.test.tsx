import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useParams } from 'next/navigation'

import { MESSAGE_CODES } from '@/shared/api/types'
import { renderWithProviders } from '@/test/renderWithProviders'

import { DeleteTagForm } from './DeleteTagForm'

const { deleteTagAction } = vi.hoisted(() => ({
  deleteTagAction: vi.fn(),
}))

vi.mock('../api/deleteTagAction', () => ({
  deleteTagAction,
}))
vi.mock('next/navigation')
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}))

const defaultTagId = '1'

describe('DeleteTagForm', () => {
  beforeEach(() => {
    vi.mocked(useParams).mockReturnValue({})
  })

  it('should render enabled elements by default', () => {
    renderWithProviders(<DeleteTagForm tagId={defaultTagId} />)

    expect(screen.getByRole('button')).toBeEnabled()
  })
  it('should call deleteTagAction with corresponding arguments', async () => {
    vi.mocked(deleteTagAction).mockResolvedValueOnce({
      isSuccess: true,
      message: MESSAGE_CODES.TAG_DELETE_SUCCESS,
    })

    renderWithProviders(<DeleteTagForm tagId={defaultTagId} />)

    const submit = screen.getByRole('button')
    await userEvent.click(submit)

    expect(deleteTagAction).toHaveBeenCalledWith(
      defaultTagId,
      false,
      'en',
      expect.any(Object),
      expect.any(Object),
    )
  })
  it('should call deleteTagAction with isOnTagPage as true when on tag page', async () => {
    vi.mocked(useParams).mockReturnValueOnce({ tagId: defaultTagId })
    vi.mocked(deleteTagAction).mockResolvedValueOnce({
      isSuccess: true,
      message: MESSAGE_CODES.TAG_DELETE_SUCCESS,
    })

    renderWithProviders(<DeleteTagForm tagId={defaultTagId} />)

    const submit = screen.getByRole('button')
    await userEvent.click(submit)

    expect(deleteTagAction).toHaveBeenCalledWith(
      defaultTagId,
      true,
      'en',
      expect.any(Object),
      expect.any(Object),
    )
  })
})
