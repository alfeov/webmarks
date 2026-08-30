import { SidebarMenu } from '@/shared/ui/sidebar'

import { SidebarMenuItemSkeleton } from './SidebarMenuItemSkeleton'

export function SidebarMenuListSkeleton() {
  return (
    <SidebarMenu>
      {Array.from({ length: 5 }).map((_, i) => (
        <SidebarMenuItemSkeleton key={i} />
      ))}
    </SidebarMenu>
  )
}
