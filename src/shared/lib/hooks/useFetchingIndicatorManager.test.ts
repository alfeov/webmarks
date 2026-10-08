import { renderHook } from '@testing-library/react'

import {
  hidingDelay,
  useFetchingIndicatorManager,
} from './useFetchingIndicatorManager'

const showFetchingIndicator = vi.fn()
const hideFetchingIndicator = vi.fn()

vi.mock('../contexts/FetchingIndicatorContext', () => ({
  useFetchingIndicatorContext: () => ({
    showFetchingIndicator,
    hideFetchingIndicator,
  }),
}))

const customRenderHook = (initialProps: { condition: boolean }) => {
  return renderHook(({ condition }) => useFetchingIndicatorManager(condition), {
    initialProps,
  })
}

describe('useFetchingIndicatorManager', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should call showFetchingIndicator when condition is true', () => {
    customRenderHook({ condition: true })

    expect(showFetchingIndicator).toHaveBeenCalled()
  })
  it('should not call showFetchingIndicator when condition is false', () => {
    customRenderHook({ condition: false })

    expect(showFetchingIndicator).not.toHaveBeenCalled()
  })
  it('should call hideFetchingIndicator after delay if hook is unmount and should not call showFetchingIndicator again', () => {
    const { unmount } = customRenderHook({ condition: true })

    expect(showFetchingIndicator).toHaveBeenCalledTimes(1)
    expect(hideFetchingIndicator).not.toHaveBeenCalled()

    unmount()
    vi.advanceTimersByTime(hidingDelay)

    expect(showFetchingIndicator).toHaveBeenCalledTimes(1)
    expect(hideFetchingIndicator).toHaveBeenCalled()
  })
  it('should call hideFetchingIndicator after delay if condition changed and should not call showFetchingIndicator again', async () => {
    const { rerender } = customRenderHook({ condition: true })

    expect(showFetchingIndicator).toHaveBeenCalledTimes(1)
    expect(hideFetchingIndicator).not.toHaveBeenCalled()

    rerender({ condition: false })
    vi.advanceTimersByTime(hidingDelay)

    expect(showFetchingIndicator).toHaveBeenCalledTimes(1)
    expect(hideFetchingIndicator).toHaveBeenCalled()
  })
})
