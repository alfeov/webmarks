'use client'

import { Tag } from '@/shared/lib/prisma/generated/client'
import { Button } from '@/shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

import { DeleteTagDropdownItem } from './DeleteTagDropdownItem'
import { EditTagDropdownItem } from './EditTagDropdownItem'

import { LucideEllipsis } from 'lucide-react'

type TagDropdownMenuProps = Tag

export function TagDropdownMenu({ ...tag }: TagDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant='ghost'
            size='icon-xs'
            data-slot='dropdown-menu-trigger'
          >
            <LucideEllipsis />
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <EditTagDropdownItem {...tag} />
          <DeleteTagDropdownItem tagId={tag.id} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
