import { screen } from '@testing-library/react'
import { useParams } from 'next/navigation'

import type { Tag } from '@/shared/lib/prisma/generated/client'
import { renderWithProviders } from '@/test/renderWithProviders'

import { CreateMark } from './CreateMark'
import { CreateMarkForm } from './CreateMarkForm'

vi.mock('next/navigation')
vi.mock('./LoadMetaForm')
vi.mock('./CreateMarkForm')

const defaultTags: Tag[] = [
  {
    id: '1',
    title: 'Vercel',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '1',
  },
  {
    id: '2',
    title: 'AI',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '1',
  },
]

describe('CreateMark', () => {
  it('should pass current tag id and title if they present in page params and tag context respectively', () => {
    vi.mocked(useParams).mockReturnValue({ tagId: '1' })

    renderWithProviders(<CreateMark />, { tags: defaultTags })

    expect(CreateMarkForm).toHaveBeenCalledWith(
      {
        currentTagId: '1',
        currentTagTitle: 'Vercel',
      },
      undefined,
    )
  })
  it('should pass tag id and title as undefined if they absent in page params and tag context respectively', () => {
    vi.mocked(useParams).mockReturnValue({})

    renderWithProviders(<CreateMark />)

    expect(CreateMarkForm).toHaveBeenCalledWith(
      {
        currentTagId: undefined,
        currentTagTitle: undefined,
      },
      undefined,
    )
  })
  it('should pass tag id if it present in page params and tag title as undefined if it not found in tags context', () => {
    vi.mocked(useParams).mockReturnValue({ tagId: '1' })

    renderWithProviders(<CreateMark />)

    expect(CreateMarkForm).toHaveBeenCalledWith(
      {
        currentTagId: '1',
        currentTagTitle: undefined,
      },
      undefined,
    )
  })
})
