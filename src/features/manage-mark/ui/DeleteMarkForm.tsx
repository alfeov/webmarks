'use client'

import { useActionState } from 'react'

import { useCloseDialogOn } from '@/shared/lib/hooks/useCloseDialogOn'
import { useNotificationManager } from '@/shared/lib/hooks/useNotificationManager'
import { WebMark } from '@/shared/lib/prisma/generated/client'
import { Button } from '@/shared/ui/button'
import { FieldDescription, FieldLegend, FieldSet } from '@/shared/ui/field'

import { deleteMarkAction } from '../api/deleteMarkAction'
import { DeleteMarkFormState } from '../model/types'

const initialState: DeleteMarkFormState = {
  isSuccess: false,
  message: null,
}

export function DeleteMarkForm({ markId }: { markId: WebMark['id'] }) {
  const [state, formAction, isPending] = useActionState(
    deleteMarkAction.bind(null, markId),
    initialState,
  )
  useNotificationManager(state.message, state.isSuccess, !isPending)
  useCloseDialogOn(state.isSuccess)

  return (
    <form action={formAction}>
      <FieldSet disabled={isPending}>
        <FieldLegend>Delete WebMark?</FieldLegend>
        <FieldDescription>
          Are you sure you want to delete this WebMark?
        </FieldDescription>
        <Button type='submit'>Delete</Button>
      </FieldSet>
    </form>
  )
}
