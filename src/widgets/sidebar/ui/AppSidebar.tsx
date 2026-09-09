import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTriggerInset,
} from '@/shared/ui/sidebar'

import { AllMarksSidebarGroup } from './AllMarksSidebarGroup'
import { TagsSidebarGroup } from './TagsSidebarGroup'

// to use inset sidebar variant
// 1. set up height of parent in layout
// 2. set up content-height variable: calc(100dvh - 1px - var(--header-height))
// 3. set up className: 'h-(--content-height) min-h-full' on Provider
// 4. set up collapsible='none' variant='inset' on Sidebar

export function AppSidebar() {
  return (
    <SidebarProvider className='h-(--content-height) min-h-full'>
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
