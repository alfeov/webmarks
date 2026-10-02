'use client'

import { useTranslations } from 'next-intl'
import { useActionState } from 'react'

import { useFetchingIndicatorManager } from '@/shared/lib/hooks/useFetchingIndicatorManager'
import { WebMark } from '@/shared/lib/prisma/generated/client'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

import { toggleMarkPinnedAction } from '../api/toggleMarkPinnedAction'
import type { PinMarkFormState } from '../model/types'

type PinMarkDropdownItemProps = Pick<WebMark, 'id' | 'pinned'>

const initialState = {
  isSuccess: false,
}

export function PinMarkDropdownItem({ id, pinned }: PinMarkDropdownItemProps) {
  const [_, formAction, isPending] = useActionState<PinMarkFormState>(
    toggleMarkPinnedAction.bind(null, { id, pinned }),
    initialState,
  )
  useFetchingIndicatorManager(isPending)

  const t = useTranslations('markDropdown')

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
