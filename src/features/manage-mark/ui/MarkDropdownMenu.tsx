import { WebMarkWithTags } from '@/entities/mark/model/types'
import { ChangeMarkTagsDropdownItem } from '@/features/manage-mark/ui/ChangeMarkTagsDropdownItem'
import { Button } from '@/shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

import { PinMarkDropdownItem } from './PinMarkDropdownItem'

import { LucideEllipsis } from 'lucide-react'

type MarkDropDownMenuProps = WebMarkWithTags

export function MarkDropdownMenu({ ...mark }: MarkDropDownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            size='icon-sm'
            variant='ghost'
            data-slot='dropdown-menu-trigger'
            aria-label='mark menu'
          >
            <LucideEllipsis />
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>Open WebMark</DropdownMenuItem>
          <DropdownMenuItem>Copy Link</DropdownMenuItem>
          <ChangeMarkTagsDropdownItem {...mark} />
          <PinMarkDropdownItem id={mark.id} pinned={mark.pinned} />
          <DropdownMenuItem>Change</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
