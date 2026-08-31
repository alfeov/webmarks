'use client'

import { useTagsContext } from '@/entities/tag/model/TagsContext'
import { SidebarMenu } from '@/shared/ui/sidebar'

import { TagMenuItem } from './TagMenuItem'

export function TagsSidebarMenu() {
  const { tags } = useTagsContext()

  return (
    <SidebarMenu>
      {tags.map((tag) => (
        <TagMenuItem key={tag.id} {...tag} />
      ))}
    </SidebarMenu>
  )
}
