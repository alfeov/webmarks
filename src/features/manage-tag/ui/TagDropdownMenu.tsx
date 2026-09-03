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

import { LucideEllipsis } from 'lucide-react'

export function TagDropdownMenu({ tagId }: { tagId: Tag['id'] }) {
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
          <DeleteTagDropdownItem tagId={tagId} />
          <DropdownMenuItem>Change</DropdownMenuItem>
          <DropdownMenuItem>Share</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
