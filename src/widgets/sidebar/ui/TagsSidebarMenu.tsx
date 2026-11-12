import { getTranslations } from 'next-intl/server'

import { getAllUserTags } from '@/entities/tag/api/getAllUserTags'
import { EmptyMessage } from '@/shared/components/EmptyMessage'
import { TEST_IDS } from '@/shared/config/testids'
import { verifySession } from '@/shared/lib/session'
import { SidebarMenu } from '@/shared/ui/sidebar'

import { TagSidebarMenuItem } from './TagSidebarMenuItem'

export async function TagsSidebarMenu() {
  const session = await verifySession()
  const tags = session ? await getAllUserTags({ userId: session.userId }) : []

  const t = await getTranslations('TagsSidebarMenu')

  return (
    <SidebarMenu data-testid={TEST_IDS.STATIC.TAG_LIST}>
      {!session && (
        <EmptyMessage
          className='pt-4'
          data-testid={TEST_IDS.STATIC.TAGS_UNAUTHORIZED_MESSAGE}
        >
          {t('unauthorizedMessage')}
        </EmptyMessage>
      )}
      {Boolean(tags.length) &&
        tags.map((tag) => (
          <TagSidebarMenuItem key={`${tag.id}-${tag.updatedAt}`} {...tag} />
        ))}
      {session && !tags.length && (
        <EmptyMessage
          className='pt-4'
          data-testid={TEST_IDS.STATIC.TAGS_NOT_FOUND_MESSAGE}
        >
          {t('notFoundMessage')}
        </EmptyMessage>
      )}
    </SidebarMenu>
  )
}
