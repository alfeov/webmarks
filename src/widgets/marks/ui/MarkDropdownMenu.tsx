import { WebMarkWithTags } from '@/entities/mark/model/types'
import { MarkTagsMenuItem } from '@/features/manage-mark-tags/ui/MarkTagsMenuItem'
import { Button } from '@/shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

import { LucideEllipsis } from 'lucide-react'

type MarkDropDownMenuProps = Pick<WebMarkWithTags, 'pinned' | 'tags'>

export function MarkDropdownMenu({ pinned, tags }: MarkDropDownMenuProps) {
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
          <DropdownMenuItem>{pinned ? 'Unpin' : 'Pin'}</DropdownMenuItem>
          <MarkTagsMenuItem markTags={tags} />
          <DropdownMenuItem>Copy Link</DropdownMenuItem>
          <DropdownMenuItem>Change</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
