'use client'

import { useTranslations } from 'next-intl'

import { copy } from '@/shared/lib/utils/copy'
import { showToast } from '@/shared/lib/utils/showToast'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

export function CopyLinkDropdownItem({ url }: { url: string }) {
  const tToast = useTranslations('toast')
  const tMarkDropdownMenu = useTranslations('MarkDropdownMenu')

  const handleClick = async () => {
    const { isSuccess, message } = await copy(url)
    const title = isSuccess ? tToast('successTitle') : tToast('errorTitle')
    showToast(title, message, isSuccess)
  }

  return (
    <DropdownMenuItem onClick={handleClick}>
      {tMarkDropdownMenu('items.copy')}
    </DropdownMenuItem>
  )
}
