import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/shared/ui/sidebar'

import { TagDialog } from './TagDialog'
import { TagItem } from './TagItem'

const tags = ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4']

export function TagList() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className='text-[16px]'>Tags</SidebarGroupLabel>
      <TagDialog />
      <SidebarMenu>
        {tags.map((tag) => (
          <TagItem key={tag} title={tag} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
