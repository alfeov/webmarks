import { getTranslations } from 'next-intl/server'

import type { WebMarkWithTags } from '@/entities/mark/model/types'
import { getAllUserTags } from '@/entities/tag/api/getAllUserTags'
import { ChangeMarkTagsDropdownItem } from '@/features/manage-mark/ui/ChangeMarkTagsDropdownItem'
import { verifySession } from '@/shared/lib/session'
import { Button } from '@/shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

import { CopyLinkDropdownItem } from './CopyLinkDropdownItem'
import { DeleteMarkDropdownItem } from './DeleteMarkDropdownItem'
import { EditMarkDropdownItem } from './EditMarkDropdownItem'
import { OpenMarkDropdownItem } from './OpenMarkDropdownItem'
import { PinMarkDropdownItem } from './PinMarkDropdownItem'

import { LucideEllipsis } from 'lucide-react'

type MarkDropDownMenuProps = WebMarkWithTags

export async function MarkDropdownMenu({ ...mark }: MarkDropDownMenuProps) {
  const session = await verifySession()
  const tags = session ? await getAllUserTags({ userId: session.userId }) : []

  const t = await getTranslations('MarkDropdownMenu')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            size='icon-sm'
            variant='ghost'
            data-slot='dropdown-menu-trigger'
            aria-label={t('ariaLabel')}
          >
            <LucideEllipsis />
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <OpenMarkDropdownItem url={mark.url} />
          <CopyLinkDropdownItem url={mark.url} />
          <ChangeMarkTagsDropdownItem
            markId={mark.id}
            markTags={mark.tags}
            tags={tags}
          />
          <EditMarkDropdownItem {...mark} />
          <PinMarkDropdownItem id={mark.id} pinned={mark.pinned} />
          <DeleteMarkDropdownItem id={mark.id} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
