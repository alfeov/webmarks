'use client'

import { useTranslations } from 'next-intl'

import { copy } from '@/shared/lib/utils/copy'
import { showToast } from '@/shared/lib/utils/showToast'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

export function CopyLinkDropdownItem({ url }: { url: string }) {
  const handleClick = async () => {
    const { isSuccess, message } = await copy(url)
    showToast(message, isSuccess)
  }

  const t = useTranslations('MarkDropdownMenu')

  return (
    <DropdownMenuItem onClick={handleClick}>{t('items.copy')}</DropdownMenuItem>
  )
}
