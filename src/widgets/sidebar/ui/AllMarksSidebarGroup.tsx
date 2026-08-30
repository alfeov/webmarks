import Link from 'next/link'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui/sidebar'

export function AllMarksSidebarGroup() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className='text-[16px]'>Main</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <Link href='/'>
            <SidebarMenuButton>Show All WebMarks</SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
