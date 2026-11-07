import { TEST_IDS } from '@/shared/config/testids'
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
        <SidebarContent data-testid={TEST_IDS.STATIC.SIDEBAR_CONTENT}>
          <TagsSidebarGroup />
        </SidebarContent>
      </Sidebar>
      <SidebarTriggerInset
        data-testid={TEST_IDS.CLICKABLE.BUTTON.TOGGLE_SIDEBAR}
      />
    </SidebarProvider>
  )
}
