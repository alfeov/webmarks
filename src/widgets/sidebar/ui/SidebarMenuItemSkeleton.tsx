import { SidebarMenuItem } from '@/shared/ui/sidebar'
import { Skeleton } from '@/shared/ui/skeleton'

export function SidebarMenuItemSkeleton() {
  return (
    <SidebarMenuItem>
      <Skeleton className='h-9 w-full rounded-xl' />
    </SidebarMenuItem>
  )
}
