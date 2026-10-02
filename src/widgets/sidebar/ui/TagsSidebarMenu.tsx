import { getTranslations } from 'next-intl/server'

import { getAllUserTags } from '@/entities/tag/api/getAllUserTags'
import { verifySession } from '@/shared/lib/session'
import { EmptyDescription } from '@/shared/ui/empty'
import { SidebarMenu } from '@/shared/ui/sidebar'

import { TagSidebarMenuItem } from './TagSidebarMenuItem'

export async function TagsSidebarMenu() {
  const session = await verifySession()
  const { tags, message } = await getAllUserTags({ userId: session?.userId })

  const t = await getTranslations('tagsSidebarMenu')

  return (
    <SidebarMenu>
      {tags.map((tag) => (
        <TagSidebarMenuItem key={`${tag.id}-${tag.updatedAt}`} {...tag} />
      ))}
      {message && (
        <EmptyDescription className='pt-4 text-center'>
          {message === 'UNAUTHORIZED'
            ? t('unauthorizedMessage')
            : t('notFoundMessage')}
        </EmptyDescription>
      )}
    </SidebarMenu>
  )
}
