import { TEST_IDS } from '@/shared/config/testids'
import { SidebarMenu } from '@/shared/ui/sidebar'

import { SidebarMenuItemSkeleton } from './SidebarMenuItemSkeleton'

export function SidebarMenuListSkeleton() {
  return (
    <SidebarMenu data-testid={TEST_IDS.STATIC.SKELETON_FALLBACK}>
      {Array.from({ length: 7 }).map((_, i) => (
        <SidebarMenuItemSkeleton key={i} />
      ))}
    </SidebarMenu>
  )
}
