import { SidebarMenuItem } from '@/shared/ui/sidebar'
import { Skeleton } from '@/shared/ui/skeleton'

export function SidebarMenuItemSkeleton() {
  return (
    <SidebarMenuItem>
      <Skeleton className='w-full h-9 rounded-xl' />
    </SidebarMenuItem>
  )
}
