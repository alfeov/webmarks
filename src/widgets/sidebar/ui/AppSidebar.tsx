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
    <SidebarProvider className='items-start border-r min-h-full'>
      <Sidebar collapsible='none' className='hidden md:flex bg-(--background)'>
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
