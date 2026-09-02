'use client'

import { useActionState } from 'react'

import { useActiveMarkContext } from '@/entities/mark/model/ActiveMarkContext'
import { useTagsContext } from '@/entities/tag/model/TagsContext'
import { useNotificationManager } from '@/shared/lib/hooks/useNotificationManager'
import { Button } from '@/shared/ui/button'
import { FieldDescription, FieldLegend, FieldSet } from '@/shared/ui/field'

import { setMarkTagsAction } from '../api/setMarkTagsAction'
import { MarkTagsFormState } from '../model/types'
import { MarkTagItem } from './MarkTagItem'

const initialState: MarkTagsFormState = {
  isSuccess: true,
  message: null,
}

export function MarkTagsForm() {
  const { tags } = useTagsContext()
  const { activeMark } = useActiveMarkContext()
  const [state, formAction, isPending] = useActionState<
    MarkTagsFormState,
    FormData
  >(setMarkTagsAction, initialState)
  useNotificationManager(state.message, state.isSuccess)

  return (
    <form action={formAction}>
      <FieldSet className='gap-3' disabled={isPending}>
        <FieldLegend>WebMark Tags</FieldLegend>
        <FieldDescription>Select Tags to WebMark</FieldDescription>
        <input name='markId' defaultValue={activeMark?.id} hidden />
        {tags.map((tag) => {
          const hasTag = activeMark?.tags.some(
            (markTag) => markTag.id === tag.id,
          )

          return <MarkTagItem key={tag.id} {...tag} defaultChecked={hasTag} />
        })}
        <Button type='submit'>Apply Tags</Button>
      </FieldSet>
    </form>
  )
}
