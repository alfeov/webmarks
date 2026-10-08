import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { useClickOutside } from './useClickOutside'

const mockFn = vi.fn()

const spyOnAddEventListener = vi.spyOn(document, 'addEventListener')
const spyOnRemoveEventListener = vi.spyOn(document, 'removeEventListener')

const TestComponent = ({ callback }: { callback: () => void }) => {
  const ref = useClickOutside(callback)
  return <div ref={ref}>test</div>
}

describe('useClickOutside', () => {
  it('should call callback when click outside', async () => {
    const { container } = render(<TestComponent callback={mockFn} />)

    await userEvent.click(container)

    expect(mockFn).toHaveBeenCalled()
  })
  it('should not call callback when click on element with ref', () => {
    render(<TestComponent callback={mockFn} />)

    userEvent.click(screen.getByText('test'))

    expect(mockFn).not.toHaveBeenCalled()
  })
  it('should add EventListener to document on mount', () => {
    render(<TestComponent callback={mockFn} />)

    expect(spyOnAddEventListener).toHaveBeenCalled()
  })
  it('should call remove EventListener from document when effect rerun', () => {
    const { rerender } = render(<TestComponent callback={mockFn} />)

    rerender(<TestComponent callback={vi.fn} />)

    expect(spyOnRemoveEventListener).toHaveBeenCalled()
  })
})
