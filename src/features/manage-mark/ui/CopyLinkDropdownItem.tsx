'use client'

import { copy } from '@/shared/lib/utils/copy'
import { showToast } from '@/shared/lib/utils/showToast'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

export function CopyLinkDropdownItem({ url }: { url: string }) {
  const handleClick = async () => {
    const { isSuccess, message } = await copy(url)
    showToast(message, isSuccess)
  }

  return <DropdownMenuItem onClick={handleClick}>Copy Link</DropdownMenuItem>
}
