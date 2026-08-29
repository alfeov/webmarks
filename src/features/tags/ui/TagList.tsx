import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/shared/ui/sidebar'

import { loadTags } from '../api/loadTags'
import { TagDialog } from './TagDialog'
import { TagItem } from './TagItem'

export async function TagList() {
  const { tags, message } = await loadTags()

  return (
    <SidebarGroup>
      <SidebarGroupLabel className='text-[16px]'>Tags</SidebarGroupLabel>
      <TagDialog />
      <SidebarMenu>
        {tags.map((tag) => (
          <TagItem key={tag.id} {...tag} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
