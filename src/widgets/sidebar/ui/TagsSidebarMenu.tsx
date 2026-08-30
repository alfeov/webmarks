import { loadTags } from '@/features/tags/api/loadTags'
import { SidebarMenu } from '@/shared/ui/sidebar'

import { TagMenuItem } from './TagMenuItem'

export async function TagsSidebarMenu() {
  const { tags } = await loadTags()

  return (
    <SidebarMenu>
      {tags.map((tag) => (
        <TagMenuItem key={tag.id} {...tag} />
      ))}
    </SidebarMenu>
  )
}
