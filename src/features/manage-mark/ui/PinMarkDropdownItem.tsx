'use client'

import { useTranslations } from 'next-intl'
import { startTransition, useActionState } from 'react'

import { TEST_IDS } from '@/shared/config/testids'
import { useFetchingIndicatorManager } from '@/shared/lib/hooks/useFetchingIndicatorManager'
import type { WebMark } from '@/shared/lib/prisma/generated/client'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

import { toggleMarkPinnedAction } from '../api/toggleMarkPinnedAction'

type PinMarkDropdownItemProps = Pick<WebMark, 'id' | 'pinned'>

export function PinMarkDropdownItem({ id, pinned }: PinMarkDropdownItemProps) {
  const [_, formAction, isPending] = useActionState(
    toggleMarkPinnedAction.bind(null, { id, pinned }),
    undefined,
  )
  useFetchingIndicatorManager(isPending)

  const t = useTranslations('MarkDropdownMenu')

  return (
    <DropdownMenuItem
      onClick={() => {
        startTransition(() => {
          formAction()
        })
      }}
      data-testid={TEST_IDS.CLICKABLE.BUTTON.PIN_MARK}
    >
      {pinned ? t('items.unpin') : t('items.pin')}
    </DropdownMenuItem>
  )
}
