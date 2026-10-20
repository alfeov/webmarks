'use client'

import { useTranslations } from 'next-intl'

import { usePathname, useRouter } from '@/shared/i18n/navigation'
import { routing } from '@/shared/i18n/routing'
import { DropdownMenuGroup, DropdownMenuItem } from '@/shared/ui/dropdown-menu'

export function SwitchLocaleMenuGroup() {
  const pathname = usePathname()
  const router = useRouter()

  const t = useTranslations('SwitchLocale')

  return (
    <DropdownMenuGroup>
      {routing.locales.map((locale) => (
        <DropdownMenuItem
          data-testid='locale-item'
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
  )
}
