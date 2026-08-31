'use client'

import { useTagsContext } from '@/entities/tag/model/TagsContext'
import { FieldSet } from '@/shared/ui/field'

import { useMarkTagsDialogContext } from '../model/MarkTagsDialogContext'
import { MarkTagItem } from './MarkTagItem'

export function MarkTagsForm() {
  const { tags } = useTagsContext()
  const { markTags } = useMarkTagsDialogContext()

  return (
    <form>
      <FieldSet className='gap-3'>
        {tags.map((tag) => {
          const isChecked = markTags.some((markTag) => markTag.id === tag.id)

          return (
            <MarkTagItem
              key={tag.id}
              tagId={tag.id}
              title={tag.title}
              defaultChecked={isChecked}
            />
          )
        })}
      </FieldSet>
    </form>
  )
}
