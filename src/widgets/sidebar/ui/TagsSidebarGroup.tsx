import { Suspense } from 'react'

import { SidebarGroup, SidebarGroupLabel } from '@/shared/ui/sidebar'

import { SidebarMenuListSkeleton } from './SidebarMenuListSkeleton'
import { TagsSidebarGroupAction } from './TagsSidebarGroupAction'
import { TagsSidebarMenu } from './TagsSidebarMenu'

export function TagsSidebarGroup() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className='text-[16px]'>Tags</SidebarGroupLabel>
      <TagsSidebarGroupAction />
      <Suspense fallback={<SidebarMenuListSkeleton />}>
        <TagsSidebarMenu />
      </Suspense>
    </SidebarGroup>
  )
}
