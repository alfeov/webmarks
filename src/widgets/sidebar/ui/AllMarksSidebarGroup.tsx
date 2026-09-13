'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui/sidebar'

import { useCloseMobileSidebarOnClick } from '../lib/useCloseMobileSidebarOnClick'

export function AllMarksSidebarGroup() {
  const pathname = usePathname()
  const handleClick = useCloseMobileSidebarOnClick()

  return (
    <SidebarGroup>
      <SidebarGroupLabel className='text-[16px]'>Main</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <Link href='/' prefetch onClick={handleClick}>
            <SidebarMenuButton data-active={pathname === '/'}>
              Show All WebMarks
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
