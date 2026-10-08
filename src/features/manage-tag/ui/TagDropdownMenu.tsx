'use client'

import { useTranslations } from 'next-intl'

import type { Tag } from '@/shared/lib/prisma/generated/client'
import { Button } from '@/shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

import { DeleteTagDropdownItem } from './DeleteTagDropdownItem'
import { EditTagDropdownItem } from './EditTagDropdownItem'

import { LucideEllipsis } from 'lucide-react'

type TagDropdownMenuProps = Tag

export function TagDropdownMenu({ ...tag }: TagDropdownMenuProps) {
  const t = useTranslations('TagDropdownMenu')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant='ghost'
            size='icon-xs'
            data-slot='dropdown-menu-trigger'
            aria-label={t('ariaLabel')}
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
