'use client'

import { useActionState } from 'react'

import { WebMarkWithTags } from '@/entities/mark/model/types'
import { useTagsContext } from '@/entities/tag/model/TagsContext'
import { useCloseDialogOn } from '@/shared/lib/hooks/useCloseDialogOn'
import { useNotificationManager } from '@/shared/lib/hooks/useNotificationManager'
import { WebMark } from '@/shared/lib/prisma/generated/client'
import { Button } from '@/shared/ui/button'
import { FieldDescription, FieldLegend, FieldSet } from '@/shared/ui/field'

import { changeMarkTagsAction } from '../api/changeMarkTagsAction'
import { ChangeMarkTagsFormState } from '../model/types'
import { MarkTagItem } from './MarkTagItem'

const initialState: ChangeMarkTagsFormState = {
  isSuccess: false,
  message: null,
}

export function ChangeMarkTagsForm({
  markId,
  markTags,
}: {
  markId: WebMark['id']
  markTags: WebMarkWithTags['tags']
}) {
  const { tags } = useTagsContext()
  const [state, formAction, isPending] = useActionState(
    changeMarkTagsAction.bind(null, markId),
    initialState,
  )
  useCloseDialogOn(state.isSuccess)
  useNotificationManager(state.message, state.isSuccess, !isPending)

  return (
    <form action={formAction}>
      <FieldSet className='gap-3' disabled={isPending}>
        <FieldLegend>Change WebMark Tags</FieldLegend>
        <FieldDescription>Select Tags to apply to WebMark</FieldDescription>
        {tags.map((tag) => {
          const hasTag = markTags.some((markTag) => markTag.id === tag.id)

          return (
            <MarkTagItem
              key={`${tag.id}-${tag.updatedAt}`}
              {...tag}
              defaultChecked={hasTag}
            />
          )
        })}
        <Button type='submit'>Apply Tags</Button>
      </FieldSet>
    </form>
  )
}
