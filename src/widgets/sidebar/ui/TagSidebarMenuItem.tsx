'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import { TagDropdownMenu } from '@/features/manage-tag/ui/TagDropdownMenu'
import { Tag } from '@/shared/lib/prisma/generated/client'
import { SidebarMenuButton, SidebarMenuItem } from '@/shared/ui/sidebar'

type TagSidebarMenuItemProps = Tag

export function TagSidebarMenuItem({ ...tag }: TagSidebarMenuItemProps) {
  const params = useParams<{ tagId?: string }>()

  return (
    <SidebarMenuItem>
      <Link href={tag.id} prefetch className='rounded-xl w-full'>
        <SidebarMenuButton
          className='pr-8'
          data-active={params.tagId === tag.id}
        >
          <span className='truncate'>{tag.title}</span>
        </SidebarMenuButton>
      </Link>
      <div className='absolute top-1/2 -translate-y-1/2 right-1 flex aspect-square w-6 items-center justify-center rounded-xl'>
        <TagDropdownMenu {...tag} />
      </div>
    </SidebarMenuItem>
  )
}
