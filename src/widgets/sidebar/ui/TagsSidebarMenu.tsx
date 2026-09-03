import { getAllUserTags } from '@/entities/tag/api/getAllUserTags'
import { verifySession } from '@/shared/lib/session'
import { SidebarMenu } from '@/shared/ui/sidebar'

import { TagSidebarMenuItem } from './TagSidebarMenuItem'

export async function TagsSidebarMenu() {
  const session = await verifySession()
  const { tags } = await getAllUserTags({ userId: session?.userId })

  return (
    <SidebarMenu>
      {tags.map((tag) => (
        <TagSidebarMenuItem key={`${tag.id}-${tag.updatedAt}`} {...tag} />
      ))}
    </SidebarMenu>
  )
}
