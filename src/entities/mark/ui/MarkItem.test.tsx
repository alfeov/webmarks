import { render, screen } from '@testing-library/react'

import { TEST_IDS } from '@/shared/config/testids'

import { MarkItem, type MarkItemProps } from './MarkItem'

const defaultProps: MarkItemProps = {
  id: '1',
  userId: '1',
  title: 'Vercel',
  description: 'Description',
  logoUrl: 'https://some-url.com',
  url: 'https://some-url.com',
  pinned: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  tags: [
    {
      id: '1',
      userId: '1',
      title: 'Tag title',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  children: null,
}

describe('MarkItem', () => {
  it('should render fallback with first letter of title if passed empty logoUrl', () => {
    render(<MarkItem {...{ ...defaultProps, logoUrl: '' }} />)

    expect(screen.getByRole('link').textContent).toBe('V')
  })
  it('should render rest of url', () => {
    render(<MarkItem {...defaultProps} />)

    expect(screen.getByTestId(TEST_IDS.STATIC.MARK_ITEM_URL)).toHaveTextContent(
      'some-url.com',
    )
  })
  it('should render tags if passed', () => {
    render(<MarkItem {...defaultProps} />)

    expect(
      screen.getByTestId(TEST_IDS.STATIC.MARK_ITEM_TAG_BADGE),
    ).toHaveTextContent(defaultProps.tags[0].title)
  })
  it('should render span for correct Pin position if tags length is zero', () => {
    render(<MarkItem {...{ ...defaultProps, tags: [] }} />)

    expect(screen.getByTestId('span')).toBeInTheDocument()
    expect(screen.getByTestId(TEST_IDS.STATIC.PIN_ICON)).toBeInTheDocument()
  })
})
