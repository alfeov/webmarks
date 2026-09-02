'use client'

import { useTagsContext } from '@/entities/tag/model/TagsContext'
import { SidebarMenu } from '@/shared/ui/sidebar'

import { TagSidebarMenuItem } from './TagSidebarMenuItem'

export function TagsSidebarMenu() {
  const { tags } = useTagsContext()

  return (
    <SidebarMenu>
      {tags.map((tag) => (
        <TagSidebarMenuItem key={tag.id} {...tag} />
      ))}
    </SidebarMenu>
  )
}
