'use client'

import Link from 'next/link'

import { Tag } from '@/shared/lib/prisma/generated/client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui/sidebar'

import { LucideEllipsis } from 'lucide-react'

type TagMenuItemProps = Tag

export function TagMenuItem({ id, title }: TagMenuItemProps) {
  return (
    <SidebarMenuItem>
      <Link href={id}>
        <SidebarMenuButton>{title}</SidebarMenuButton>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <SidebarMenuAction aria-label='tag menu'>
              <LucideEllipsis />
            </SidebarMenuAction>
          }
        />
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>Delete</DropdownMenuItem>
            <DropdownMenuItem>Change</DropdownMenuItem>
            <DropdownMenuItem>Share</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  )
}
