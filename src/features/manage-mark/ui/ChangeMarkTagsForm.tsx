'use client'

import { useActionState } from 'react'

import { WebMarkWithTags } from '@/entities/mark/model/types'
import { useCloseDialogOn } from '@/shared/lib/hooks/useCloseDialogOn'
import { useNotificationManager } from '@/shared/lib/hooks/useNotificationManager'
import { Tag } from '@/shared/lib/prisma/generated/client'
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
  tags,
}: {
  markId: WebMarkWithTags['id']
  markTags: WebMarkWithTags['tags']
  tags: Tag[]
}) {
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
        {Boolean(tags.length) ? (
          tags.map((tag) => {
            const hasTag = markTags.some((markTag) => markTag.id === tag.id)

            return (
              <MarkTagItem
                key={`${tag.id}-${tag.updatedAt}`}
                {...tag}
                defaultChecked={hasTag}
              />
            )
          })
        ) : (
          <FieldDescription className='py-[20px] text-center italic'>
            You have no tags yet
          </FieldDescription>
        )}
        <Button type='submit'>Apply Tags</Button>
      </FieldSet>
    </form>
  )
}
