import { renderHook } from '@testing-library/react'
import { act } from 'react'
import MatchMediaMock from 'vitest-matchmedia-mock'

import { getLocalStorageData } from '@/shared/lib/utils/localStorage'

import { useToggleTheme } from './useToggleTheme'

vi.mock('@/shared/lib/utils/localStorage')

const spy = vi.spyOn(document.documentElement.classList, 'toggle')

describe('useToggleTheme', () => {
  const matchMediaMock = new MatchMediaMock()

  afterEach(() => {
    matchMediaMock.clear()
  })

  afterAll(() => {
    matchMediaMock.destroy()
  })

  it('should return theme from local storage', () => {
    const theme = 'light'
    vi.mocked(getLocalStorageData).mockReturnValueOnce(theme)

    const { result } = renderHook(useToggleTheme)

    expect(result.current.theme).toBe(theme)
  })
  it('should return system theme if local storage is empty', () => {
    const { result } = renderHook(useToggleTheme)

    expect(result.current.theme).toBe('system')
  })
  it('should toggle theme and html class on toggleTheme fn call', async () => {
    const { result } = renderHook(useToggleTheme)

    expect(result.current.theme).toBe('system')

    act(() => result.current.toggleTheme())
    expect(result.current.theme).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)

    act(() => result.current.toggleTheme())
    expect(result.current.theme).toBe('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)

    act(() => result.current.toggleTheme())
    expect(result.current.theme).toBe('system')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
  it('should not call toggle fn from system to dark theme if system prefers dark', () => {
    matchMediaMock.useMediaQuery('(prefers-color-scheme: dark)')

    const { result } = renderHook(useToggleTheme)
    expect(result.current.theme).toBe('system')

    act(() => result.current.toggleTheme())
    expect(result.current.theme).toBe('dark')
    expect(spy).toHaveBeenCalledTimes(0)
  })
  it('should not call toggle fn from light to system theme if system prefers light', () => {
    vi.mocked(getLocalStorageData).mockReturnValueOnce('light')
    matchMediaMock.useMediaQuery('(prefers-color-scheme: light)')

    const { result } = renderHook(useToggleTheme)
    expect(result.current.theme).toBe('light')

    act(() => result.current.toggleTheme())
    expect(result.current.theme).toBe('system')
    expect(spy).toHaveBeenCalledTimes(0)
  })
  it('should toggle html class on preference changing', () => {
    const { result } = renderHook(useToggleTheme)

    expect(result.current.theme).toBe('system')
    expect(document.documentElement.classList.contains('dark')).toBe(false)

    matchMediaMock.useMediaQuery('(prefers-color-scheme: dark)')

    expect(result.current.theme).toBe('system')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})
