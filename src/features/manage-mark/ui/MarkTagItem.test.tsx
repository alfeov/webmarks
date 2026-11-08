import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { MarkTagItem } from './MarkTagItem'

const defaultMarkId = '1'

describe('MarkTagItem', () => {
  it('should render unchecked by default', () => {
    render(<MarkTagItem id={defaultMarkId} title='Vercel' disabled={false} />)

    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })
  it('should render checked when defaultChecked is true', () => {
    render(
      <MarkTagItem
        id={defaultMarkId}
        title='Vercel'
        defaultChecked={true}
        disabled={false}
      />,
    )

    expect(screen.getByRole('checkbox')).toBeChecked()
  })
  it('should set checkbox value from id', () => {
    const { container } = render(
      <MarkTagItem id={defaultMarkId} title='Vercel' disabled={false} />,
    )

    const input = container.querySelector('input[name="tagId-1"]') // UI lib specific

    expect(input).toHaveAttribute('value', '1')
  })
  it('should toggle checked on checkbox or field click', async () => {
    render(
      <MarkTagItem
        id={defaultMarkId}
        title='Vercel'
        defaultChecked={false}
        disabled={false}
      />,
    )

    await userEvent.click(screen.getByRole('checkbox'))

    expect(screen.getByRole('checkbox')).toBeChecked()

    await userEvent.click(screen.getByRole('group'))

    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })
  it('should not toggle checked on checkbox or field click when disabled', async () => {
    render(
      <MarkTagItem
        id={defaultMarkId}
        title='Vercel'
        defaultChecked={false}
        disabled={true}
      />,
    )

    await userEvent.click(screen.getByRole('checkbox'))

    expect(screen.getByRole('checkbox')).not.toBeChecked()

    await userEvent.click(screen.getByRole('group'))

    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })
})
