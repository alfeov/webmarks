'use client'

import { useTranslations } from 'next-intl'

import { usePathname, useRouter } from '@/shared/i18n/navigation'
import { routing } from '@/shared/i18n/routing'
import { Button } from '@/shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

export function SwitchLocale() {
  const pathname = usePathname()
  const router = useRouter()

  const t = useTranslations('SwitchLocale')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant='outline' data-slot='dropdown-menu-trigger'>
            {t('button')}
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {routing.locales.map((locale) => (
            <DropdownMenuItem
              key={locale}
              onClick={() =>
                router.replace(
                  pathname + window.location.search + window.location.hash,
                  { locale },
                )
              }
            >
              {t(locale)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
