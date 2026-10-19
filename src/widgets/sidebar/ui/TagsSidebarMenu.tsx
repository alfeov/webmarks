import { getTranslations } from 'next-intl/server'

import { getAllUserTags } from '@/entities/tag/api/getAllUserTags'
import { verifySession } from '@/shared/lib/session'
import { EmptyMessage } from '@/shared/ui/EmptyMessage'
import { SidebarMenu } from '@/shared/ui/sidebar'

import { TagSidebarMenuItem } from './TagSidebarMenuItem'

export async function TagsSidebarMenu() {
  const session = await verifySession()
  const tags = session ? await getAllUserTags({ userId: session.userId }) : []

  const t = await getTranslations('TagsSidebarMenu')

  return (
    <SidebarMenu>
      {!session && (
        <EmptyMessage className='pt-4'>{t('unauthorizedMessage')}</EmptyMessage>
      )}
      {Boolean(tags.length) &&
        tags.map((tag) => (
          <TagSidebarMenuItem key={`${tag.id}-${tag.updatedAt}`} {...tag} />
        ))}
      {session && !tags.length && (
        <EmptyMessage className='pt-4'>{t('notFoundMessage')}</EmptyMessage>
      )}
    </SidebarMenu>
  )
}
