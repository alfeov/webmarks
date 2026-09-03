import Link from 'next/link'

import { TagDropdownMenu } from '@/features/manage-tag/ui/TagDropdownMenu'
import { Tag } from '@/shared/lib/prisma/generated/client'
import { SidebarMenuButton, SidebarMenuItem } from '@/shared/ui/sidebar'

type TagSidebarMenuItemProps = Tag

export function TagSidebarMenuItem({ ...tag }: TagSidebarMenuItemProps) {
  return (
    <SidebarMenuItem>
      <Link href={tag.id} className='rounded-xl w-full'>
        <SidebarMenuButton className='pr-8'>
          <span className='truncate'>{tag.title}</span>
        </SidebarMenuButton>
      </Link>
      <div className='absolute top-1/2 -translate-y-1/2 right-1 flex aspect-square w-6 items-center justify-center rounded-xl'>
        <TagDropdownMenu {...tag} />
      </div>
    </SidebarMenuItem>
  )
}
