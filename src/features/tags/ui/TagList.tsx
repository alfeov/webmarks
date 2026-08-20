import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/shared/ui/sidebar'

import { TagItem } from './TagItem'

import { Plus } from 'lucide-react'

const tags = ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4']

export function TagList() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className='text-[16px]'>Tags</SidebarGroupLabel>
      <SidebarGroupAction aria-label='create tag'>
        <Plus />
      </SidebarGroupAction>
      <SidebarMenu>
        {tags.map((tag) => (
          <TagItem key={tag} title={tag} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
