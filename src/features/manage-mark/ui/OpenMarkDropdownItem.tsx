import { useTranslations } from 'next-intl'

import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

export function OpenMarkDropdownItem({ url }: { url: string }) {
  const t = useTranslations('markDropdown')

  return (
    <a href={url} className='w-full rounded-2xl' target='_blank'>
      <DropdownMenuItem className='w-full'>{t('items.open')}</DropdownMenuItem>
    </a>
  )
}
