import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
} from '@/shared/ui/sidebar'

import { AllMarksSidebarGroup } from './AllMarksSidebarGroup'
import { TagsSidebarGroup } from './TagsSidebarGroup'

export function AppSidebar() {
  return (
    <SidebarProvider className='items-start border-r min-h-full'>
      <Sidebar collapsible='none' className='hidden md:flex bg-(--background)'>
        <SidebarHeader>
          <AllMarksSidebarGroup />
        </SidebarHeader>
        <SidebarContent>
          <TagsSidebarGroup />
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
