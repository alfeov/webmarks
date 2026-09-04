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

import { CopyLinkDropdownItem } from './CopyLinkDropdownItem'
import { OpenMarkDropdownItem } from './OpenMarkDropdownItem'
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
          <OpenMarkDropdownItem url={mark.url} />
          <CopyLinkDropdownItem url={mark.url} />
          <ChangeMarkTagsDropdownItem {...mark} />
          <PinMarkDropdownItem id={mark.id} pinned={mark.pinned} />
          <DropdownMenuItem>Change</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
