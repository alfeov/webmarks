import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { Tag } from '@/shared/lib/prisma/generated/client'
import { DropdownMenu } from '@/shared/ui/dropdown-menu'
import { renderWithProviders } from '@/test/helpers/renderWithProviders'

import { ChangeMarkTagsDropdownItem } from './ChangeMarkTagsDropdownItem'
import { ChangeMarkTagsForm } from './ChangeMarkTagsForm'

vi.mock('@/features/manage-mark/ui/ChangeMarkTagsForm')

const defaultMarkId = '1'
const defaultMarkTags: Tag[] = [
  {
    id: '1',
    title: 'Vercel',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '1',
  },
]
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

describe('ChangeMarkTagsDropdownItem', () => {
  it('should open ChangeMarkTagsForm on click and pass corresponding arguments to it', async () => {
    renderWithProviders(
      <DropdownMenu>
        <ChangeMarkTagsDropdownItem
          markId={defaultMarkId}
          markTags={defaultMarkTags}
          tags={defaultTags}
        />
      </DropdownMenu>,
    )

    await userEvent.click(screen.getByText('items.changeTags'))

    expect(ChangeMarkTagsForm).toHaveBeenCalledWith(
      {
        markId: defaultMarkId,
        markTags: defaultMarkTags,
        tags: defaultTags,
      },
      undefined,
    )
  })
})
