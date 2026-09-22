'use client'

import { useEffect, useState } from 'react'

import { useToggleTheme } from '@/features/toggle-theme/lib/useToggleTheme'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

import styles from './ThemeToggleButton.module.css'
import { Moon, Sun, SunMoon } from 'lucide-react'

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useToggleTheme()
  const [isHydrated, setIsHydrated] = useState(false)

  const Icon = theme === 'dark' ? Moon : theme === 'light' ? Sun : SunMoon

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setIsHydrated(true), [])

  if (!isHydrated) return null

  return (
    <Button
      variant='outline'
      size='icon'
      aria-label='Toggle theme'
      onClick={toggleTheme}
    >
      <Icon className={cn('size-[12px]', styles.animation)} />
    </Button>
  )
}
