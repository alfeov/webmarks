'use client'

import { useTranslations } from 'next-intl'

import { Link, usePathname } from '@/shared/i18n/navigation'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui/sidebar'

import { useCloseMobileSidebarOnClick } from '../lib/useCloseMobileSidebarOnClick'

export function AllMarksSidebarGroup() {
  const pathname = usePathname()

  const closeMobileSidebar = useCloseMobileSidebarOnClick()

  const t = useTranslations('AllMarksSidebarGroup')

  return (
    <SidebarGroup>
      <SidebarGroupLabel className='text-[16px]'>
        {t('label')}
      </SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <Link
            href='/'
            prefetch
            onClick={closeMobileSidebar}
            className='w-full rounded-xl'
          >
            <SidebarMenuButton data-active={pathname === '/'}>
              {t('showAll')}
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
