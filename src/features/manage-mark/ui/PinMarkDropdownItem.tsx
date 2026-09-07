'use client'

import { useActionState } from 'react'

import { useFetchingIndicatorManager } from '@/shared/lib/hooks/useFetchingIndicatorManager'
import { WebMark } from '@/shared/lib/prisma/generated/client'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

import { toggleMarkPinAction } from '../api/toggleMarkPinAction'
import type { PinMarkFormState } from '../model/types'

type PinMarkDropdownItemProps = Pick<WebMark, 'id' | 'pinned'>

const initialState = {
  isSuccess: false,
  message: null,
}

export function PinMarkDropdownItem({ id, pinned }: PinMarkDropdownItemProps) {
  const [_, formAction, isPending] = useActionState<PinMarkFormState>(
    toggleMarkPinAction.bind(null, { id, pinned }),
    initialState,
  )
  useFetchingIndicatorManager(isPending)

  return (
    <form action={formAction}>
      <fieldset disabled={isPending}>
        <button type='submit' className='w-full'>
          <DropdownMenuItem>{pinned ? 'Unpin' : 'Pin'}</DropdownMenuItem>
        </button>
      </fieldset>
    </form>
  )
}
