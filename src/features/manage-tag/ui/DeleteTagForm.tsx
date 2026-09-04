'use client'

import { useParams } from 'next/navigation'
import { useActionState } from 'react'

import { useCloseDialogOn } from '@/shared/lib/hooks/useCloseDialogOn'
import { useNotificationManager } from '@/shared/lib/hooks/useNotificationManager'
import { Tag } from '@/shared/lib/prisma/generated/client'
import { Button } from '@/shared/ui/button'
import { FieldDescription, FieldLegend, FieldSet } from '@/shared/ui/field'

import { deleteTagAction } from '../api/deleteTagAction'
import { DELETE_TAG_FORMDATA } from '../lib/constants'
import type { DeleteTagFormState } from '../model/types'

const initialState: DeleteTagFormState = {
  isSuccess: false,
  message: null,
}

export function DeleteTagForm({ tagId }: { tagId: Tag['id'] }) {
  const params = useParams<{ tagId?: string }>()

  const [state, formAction, isPending] = useActionState<
    DeleteTagFormState,
    FormData
  >(deleteTagAction, initialState)
  useNotificationManager(state.message, state.isSuccess, !isPending)
  useCloseDialogOn(state.isSuccess)

  return (
    <form action={formAction}>
      <FieldSet disabled={isPending}>
        <FieldLegend>Delete Tag?</FieldLegend>
        <FieldDescription>
          Are you sure you want to delete this tag?
        </FieldDescription>
        <input name={DELETE_TAG_FORMDATA.ID} value={tagId} hidden readOnly />
        <input
          name={DELETE_TAG_FORMDATA.REDIRECT}
          value={String(params.tagId === tagId)}
          hidden
          readOnly
        />
        <Button type='submit'>Confirm</Button>
      </FieldSet>
    </form>
  )
}
