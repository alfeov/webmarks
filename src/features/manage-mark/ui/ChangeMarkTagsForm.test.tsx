import { screen } from '@testing-library/react'

import { TEST_IDS } from '@/shared/config/testids'
import type { Tag } from '@/shared/lib/prisma/generated/client'
import { renderWithProviders } from '@/test/helpers/renderWithProviders'

import { ChangeMarkTagsForm } from './ChangeMarkTagsForm'

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

describe('ChangeMarkTagsForm', () => {
  it('should render enabled elements by default with default values', () => {
    renderWithProviders(
      <ChangeMarkTagsForm
        markId={defaultMarkId}
        markTags={defaultMarkTags}
        tags={defaultTags}
      />,
    )

    expect(
      screen.getByTestId(
        TEST_IDS.CHANGEABLE.INPUT.MARK_TAG_ITEM(defaultTags[0].id),
      ),
    ).toBeEnabled()
    expect(
      screen.getByTestId(
        TEST_IDS.CHANGEABLE.INPUT.MARK_TAG_ITEM(defaultTags[1].id),
      ),
    ).toBeEnabled()

    expect(screen.getByRole('button')).toBeEnabled()
  })
  it('should render checked checkbox if mark has it tag', () => {
    renderWithProviders(
      <ChangeMarkTagsForm
        markId={defaultMarkId}
        markTags={defaultMarkTags}
        tags={defaultTags}
      />,
    )

    expect(
      screen.getByTestId(
        TEST_IDS.CHANGEABLE.INPUT.MARK_TAG_ITEM(defaultTags[0].id),
      ),
    ).toBeChecked()
    expect(
      screen.getByTestId(
        TEST_IDS.CHANGEABLE.INPUT.MARK_TAG_ITEM(defaultTags[1].id),
      ),
    ).not.toBeChecked()
  })
  it('should render empty message if tags is empty', () => {
    renderWithProviders(
      <ChangeMarkTagsForm
        markId={defaultMarkId}
        markTags={defaultMarkTags}
        tags={[]}
      />,
    )

    const message = screen.getByText('emptyTags')
    expect(message).toBeInTheDocument()
  })
})
