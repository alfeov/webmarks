'use client'

import { useEffect, useState } from 'react'

import {
  getLocalStorageData,
  setLocalStorageData,
} from '@/shared/lib/utils/localStorage'

import { isThemeDark } from './isThemeDark'

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

  useEffect(() => {
    if (theme !== 'system') return
    const mql = window.matchMedia('(prefers-color-scheme: dark)')

    const onChange = () => {
      document.documentElement.classList.toggle('dark', mql.matches)
    }

    mql.addEventListener('change', onChange)
  }, [theme])

  function toggleTheme() {
    const nextTheme = NEXT_THEME[theme]
    setLocalStorageData(themeKey, nextTheme)
    setTheme(nextTheme)

    const isCurrentThemeDark = isThemeDark(theme)
    const isNextThemeDark = isThemeDark(nextTheme)

    const shouldUpdateTheme = isCurrentThemeDark !== isNextThemeDark
    if (shouldUpdateTheme) {
      // Fallback
      if (!document.startViewTransition) {
        document.documentElement.classList.toggle('dark', isNextThemeDark)
        return
      }

      document.startViewTransition(() => {
        document.documentElement.classList.toggle('dark', isNextThemeDark)
      })
    }
  }

  return { theme, toggleTheme }
}
