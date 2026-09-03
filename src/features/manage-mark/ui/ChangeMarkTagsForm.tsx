'use client'

import { useActionState } from 'react'

import { useActiveMarkContext } from '@/entities/mark/model/ActiveMarkContext'
import { useTagsContext } from '@/entities/tag/model/TagsContext'
import { useCloseDialogOn } from '@/shared/lib/hooks/useCloseDialogOn'
import { useNotificationManager } from '@/shared/lib/hooks/useNotificationManager'
import { Button } from '@/shared/ui/button'
import { FieldDescription, FieldLegend, FieldSet } from '@/shared/ui/field'

import { changeMarkTagsAction } from '../api/changeMarkTagsAction'
import { ChangeMarkTagsFormState } from '../model/types'
import { MarkTagItem } from './MarkTagItem'

const initialState: ChangeMarkTagsFormState = {
  isSuccess: false,
  message: null,
}

export function ChangeMarkTagsForm() {
  const { tags } = useTagsContext()
  const { activeMark } = useActiveMarkContext()
  const [state, formAction, isPending] = useActionState<
    ChangeMarkTagsFormState,
    FormData
  >(changeMarkTagsAction, initialState)
  useCloseDialogOn(state.isSuccess)
  useNotificationManager(state.message, state.isSuccess)

  return (
    <form action={formAction}>
      <FieldSet className='gap-3' disabled={isPending}>
        <FieldLegend>WebMark Tags</FieldLegend>
        <FieldDescription>Select Tags to WebMark</FieldDescription>
        <input name='markId' value={activeMark?.id} hidden readOnly />
        {tags.map((tag) => {
          const hasTag = activeMark?.tags.some(
            (markTag) => markTag.id === tag.id,
          )

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
