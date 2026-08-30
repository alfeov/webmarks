import { Suspense } from 'react'

import { TagDialog } from '@/features/tags/ui/TagDialog'
import { SidebarGroup, SidebarGroupLabel } from '@/shared/ui/sidebar'

import { SidebarMenuListSkeleton } from './SidebarMenuListSkeleton'
import { TagsSidebarMenu } from './TagsSidebarMenu'

export function TagsSidebarGroup() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className='text-[16px]'>Tags</SidebarGroupLabel>
      <TagDialog />
      <Suspense fallback={<SidebarMenuListSkeleton />}>
        <TagsSidebarMenu />
      </Suspense>
    </SidebarGroup>
  )
}
