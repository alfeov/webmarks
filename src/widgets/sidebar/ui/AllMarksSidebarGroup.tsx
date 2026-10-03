'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

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
          <Link href='/' prefetch onClick={closeMobileSidebar}>
            <SidebarMenuButton data-active={pathname === '/'}>
              {t('showAll')}
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
