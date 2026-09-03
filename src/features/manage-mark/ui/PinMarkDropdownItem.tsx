import { WebMark } from '@/shared/lib/prisma/generated/client'
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

import { toggleMarkPinAction } from '../api/toggleMarkPinAction'

type PinMarkDropdownItemProps = Pick<WebMark, 'id' | 'pinned'>

export function PinMarkDropdownItem({ id, pinned }: PinMarkDropdownItemProps) {
  return (
    <form action={toggleMarkPinAction.bind(null, { id, pinned })}>
      <button type='submit' className='w-full'>
        <DropdownMenuItem>{pinned ? 'Unpin' : 'Pin'}</DropdownMenuItem>
      </button>
    </form>
  )
}
