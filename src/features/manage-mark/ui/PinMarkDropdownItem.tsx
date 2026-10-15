'use client'

import { useTranslations } from 'next-intl'
import { useActionState } from 'react'

import { useFetchingIndicatorManager } from '@/shared/lib/hooks/useFetchingIndicatorManager'
import { useNotificationManager } from '@/shared/lib/hooks/useNotificationManager'
import type { WebMark } from '@/shared/lib/prisma/generated/client'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

import { toggleMarkPinnedAction } from '../api/toggleMarkPinnedAction'
import type { PinMarkFormState } from '../model/types'

type PinMarkDropdownItemProps = Pick<WebMark, 'id' | 'pinned'>

const initialState = {
  isSuccess: false,
}

export function PinMarkDropdownItem({ id, pinned }: PinMarkDropdownItemProps) {
  const [state, formAction, isPending] = useActionState<PinMarkFormState>(
    toggleMarkPinnedAction.bind(null, { id, pinned }),
    initialState,
  )
  useNotificationManager(state.message, state.isSuccess, !isPending)
  useFetchingIndicatorManager(isPending)

  const t = useTranslations('MarkDropdownMenu')

  return (
    <form action={formAction}>
      <fieldset disabled={isPending}>
        <button type='submit' className='w-full'>
          <DropdownMenuItem>
            {pinned ? t('items.unpin') : t('items.pin')}
          </DropdownMenuItem>
        </button>
      </fieldset>
    </form>
  )
}
