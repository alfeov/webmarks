'use client'

import { useState } from 'react'

import {
  getLocalStorageData,
  setLocalStorageData,
} from '@/shared/lib/utils/localStorage'

import { isPreferredDarkTheme } from './isPreferredDarkTheme'

// ! if changing it, then change in script also
export const themeKey = 'webmarks/theme'

type Theme = 'system' | 'dark' | 'light'

const NEXT_THEME: Record<Theme, Theme> = {
  system: 'dark',
  dark: 'light',
  light: 'system',
} as const

export function useToggleTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'system'
    return getLocalStorageData<Theme>(themeKey) ?? 'system'
  })

  function toggleTheme() {
    const nextTheme = NEXT_THEME[theme]
    setTheme(nextTheme)
    setLocalStorageData(themeKey, nextTheme)

    const isNextThemeDark =
      nextTheme === 'system' ? isPreferredDarkTheme() : nextTheme === 'dark'

    const root = window.document.documentElement
    root.classList.toggle('dark', isNextThemeDark)
  }

  return { theme, toggleTheme }
}
