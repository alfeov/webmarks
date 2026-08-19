import { TagList } from '@/features/tags/ui/TagList'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/shared/ui/sidebar'

export function AppSidebar() {
  return (
    <SidebarProvider className='items-start min-h-(--sidebar-height)'>
      <Sidebar collapsible='none' className='hidden md:flex m-h-full'>
        <SidebarHeader>
          <SidebarGroup>
            <SidebarGroupLabel className='text-[16px]'>Main</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>Show All WebMarks</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarHeader>
        <SidebarContent>
          <TagList />
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
