import { useEffect, useState } from 'react'

import {
  getLocalStorageData,
  setLocalStorageData,
} from '@/shared/lib/utils/localStorage'

import { isPreferredDarkTheme } from './isPreferredDarkTheme'

const themeKey = 'webmarks/theme'

function initialState(): Theme {
  return getLocalStorageData<Theme>(themeKey) ?? 'system'
}

type Theme = 'system' | 'dark' | 'light'

const NEXT_THEME: Record<Theme, Theme> = {
  system: 'dark',
  dark: 'light',
  light: 'system',
} as const

export function useToggleTheme() {
  const [theme, setTheme] = useState<Theme>(initialState)

  useEffect(() => {
    const isCurrentThemeDark =
      theme === 'system' ? isPreferredDarkTheme() : theme === 'dark'

    const root = window.document.documentElement
    root.classList.toggle('dark', isCurrentThemeDark)
  }, [theme])

  function toggleTheme() {
    const nextTheme = NEXT_THEME[theme]
    setTheme(nextTheme)
    setLocalStorageData(themeKey, nextTheme)
  }

  return toggleTheme
}
