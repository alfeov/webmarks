'use client'

import { useTranslations } from 'next-intl'
import { use } from 'react'
import { browser } from 'react-dom'

import { useToggleTheme } from '@/features/toggle-theme/lib/useToggleTheme'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

import styles from './ThemeToggleButton.module.css'
import { Moon, Sun, SunMoon } from 'lucide-react'

export function ThemeToggleButton() {
  use(browser())

  const { theme, toggleTheme } = useToggleTheme()

  const Icon = theme === 'dark' ? Moon : theme === 'light' ? Sun : SunMoon

  const t = useTranslations('ThemeToggleButton')

  return (
    <Button
      variant='outline'
      size='icon'
      aria-label={t('ariaLabel')}
      onClick={toggleTheme}
    >
      <Icon className={cn('size-[12px]', styles.animation)} />
    </Button>
  )
}
