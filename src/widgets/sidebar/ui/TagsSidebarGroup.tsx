import { useTranslations } from 'next-intl'
import { Suspense } from 'react'

import { SidebarGroup, SidebarGroupLabel } from '@/shared/ui/sidebar'

import { SidebarMenuListSkeleton } from './SidebarMenuListSkeleton'
import { TagsSidebarGroupAction } from './TagsSidebarGroupAction'
import { TagsSidebarMenu } from './TagsSidebarMenu'

export function TagsSidebarGroup() {
  const t = useTranslations('TagsSidebarGroup')

  return (
    <SidebarGroup>
      <SidebarGroupLabel className='text-[16px]'>
        {t('label')}
      </SidebarGroupLabel>
      <TagsSidebarGroupAction />
      <Suspense fallback={<SidebarMenuListSkeleton />}>
        <TagsSidebarMenu />
      </Suspense>
    </SidebarGroup>
  )
}
