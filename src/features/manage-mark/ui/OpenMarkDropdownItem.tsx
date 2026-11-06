import { useTranslations } from 'next-intl'

import { TEST_IDS } from '@/shared/config/testids'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

export function OpenMarkDropdownItem({ url }: { url: string }) {
  const t = useTranslations('MarkDropdownMenu')

  return (
    <a
      href={url}
      className='w-full rounded-2xl'
      target='_blank'
      data-testid={TEST_IDS.CLICKABLE.LINK.OPEN_MARK}
    >
      <DropdownMenuItem className='w-full'>{t('items.open')}</DropdownMenuItem>
    </a>
  )
}
