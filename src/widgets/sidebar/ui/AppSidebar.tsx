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
    <SidebarProvider className='min-h-full items-start border-r'>
      <Sidebar collapsible='none' className='hidden bg-(--background) md:flex'>
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
