import { WebMarkWithTags } from '@/entities/mark/model/types'
import { Button } from '@/shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { MarkTagsDropdownItem } from '@/widgets/marks/ui/MarkTagsMenuItem'

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
          <DropdownMenuItem>{mark.pinned ? 'Unpin' : 'Pin'}</DropdownMenuItem>
          <MarkTagsDropdownItem {...mark} />
          <DropdownMenuItem>Copy Link</DropdownMenuItem>
          <DropdownMenuItem>Change</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
