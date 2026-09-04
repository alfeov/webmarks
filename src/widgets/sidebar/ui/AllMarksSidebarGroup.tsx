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

export function AllMarksSidebarGroup() {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel className='text-[16px]'>Main</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <Link href='/' prefetch>
            <SidebarMenuButton data-active={pathname === '/'}>
              Show All WebMarks
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
