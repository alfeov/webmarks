'use client'

import { useTranslations } from 'next-intl'

import { TEST_IDS } from '@/shared/config/testids'
import { copy } from '@/shared/lib/utils/copy'
import { showToast } from '@/shared/lib/utils/showToast'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

export function CopyLinkDropdownItem({ url }: { url: string }) {
  const t = useTranslations()

  const handleClick = async () => {
    const { isSuccess, message } = await copy(url)
    const title = isSuccess ? t('toast.successTitle') : t('toast.errorTitle')
    showToast(title, t(`codes.${message}`), isSuccess)
  }

  return (
    <DropdownMenuItem
      onClick={handleClick}
      data-testid={TEST_IDS.CLICKABLE.BUTTON.COPY_MARK_LINK}
    >
      {t('MarkDropdownMenu.items.copy')}
    </DropdownMenuItem>
  )
}
