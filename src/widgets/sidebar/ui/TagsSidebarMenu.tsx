import { getAllUserTags } from '@/features/tags/api/getAllUserTags'
import { verifySession } from '@/shared/lib/session'
import { SidebarMenu } from '@/shared/ui/sidebar'

import { TagMenuItem } from './TagMenuItem'

export async function TagsSidebarMenu() {
  const session = await verifySession()
  const { tags } = await getAllUserTags({ userId: session?.userId })

  return (
    <SidebarMenu>
      {tags.map((tag) => (
        <TagMenuItem key={tag.id} {...tag} />
      ))}
    </SidebarMenu>
  )
}
