// import { useToggleTheme } from '@/shared/lib/hooks/useToggleTheme'
import { Button } from '@/shared/ui/button'

import styles from './ThemeToggleButton.module.css'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggleButton() {
  // const toggleTheme = useToggleTheme()

  return (
    <Button
      variant='outline'
      size='icon'
      aria-label='Toggle theme'
      // onClick={toggleTheme}
    >
      <Sun className={styles.sun} />
      <Moon className={styles.moon} />
    </Button>
  )
}
