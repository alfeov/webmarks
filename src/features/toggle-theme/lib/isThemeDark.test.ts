import MatchMediaMock from 'vitest-matchmedia-mock'

import { isPreferredDarkTheme, isThemeDark } from './isThemeDark'

describe('isPreferredDarkTheme', () => {
  const matchMediaMock = new MatchMediaMock()

  afterEach(() => {
    matchMediaMock.clear()
  })

  afterAll(() => {
    matchMediaMock.destroy()
  })

  it('should return true if preferred dark theme', () => {
    matchMediaMock.useMediaQuery('(prefers-color-scheme: dark)')

    const result = isPreferredDarkTheme()

    expect(result).toBe(true)
  })
  it('should return false if preferred light theme', () => {
    matchMediaMock.useMediaQuery('(prefers-color-scheme: light)')

    const result = isPreferredDarkTheme()

    expect(result).toBe(false)
  })
})

describe('isThemeDark', () => {
  it('should return false if provided theme is not dark', () => {
    const result = isThemeDark('light')

    expect(result).toBe(false)
  })
  it('should return true if provided theme is dark', () => {
    const result = isThemeDark('dark')

    expect(result).toBe(true)
  })
  it('should return result of isPreferredDarkTheme if provided theme is system', () => {
    const result = isThemeDark('system')

    expect(result).toBe(false)
  })
})
