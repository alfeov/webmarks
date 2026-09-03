import { SidebarMenu } from '@/shared/ui/sidebar'

import { SidebarMenuItemSkeleton } from './SidebarMenuItemSkeleton'

export function SidebarMenuListSkeleton() {
  return (
    <SidebarMenu>
      {Array.from({ length: 7 }).map((_, i) => (
        <SidebarMenuItemSkeleton key={i} />
      ))}
    </SidebarMenu>
  )
}
