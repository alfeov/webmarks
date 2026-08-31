'use client'

import { useActionState } from 'react'

import { useActiveMarkContext } from '@/entities/mark/model/ActiveMarkContext'
import { useTagsContext } from '@/entities/tag/model/TagsContext'
import { useNotificationManager } from '@/shared/lib/useNotificationManager'
import { Button } from '@/shared/ui/button'
import { FieldSet } from '@/shared/ui/field'

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
