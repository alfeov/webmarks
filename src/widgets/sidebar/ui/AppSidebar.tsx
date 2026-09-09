import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTriggerInset,
} from '@/shared/ui/sidebar'

import { AllMarksSidebarGroup } from './AllMarksSidebarGroup'
import { TagsSidebarGroup } from './TagsSidebarGroup'

export function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar collapsible='none' variant='inset'>
        <SidebarHeader>
          <AllMarksSidebarGroup />
        </SidebarHeader>
        <SidebarContent>
          <TagsSidebarGroup />
        </SidebarContent>
      </Sidebar>
      <SidebarTriggerInset />
    </SidebarProvider>
  )
}
