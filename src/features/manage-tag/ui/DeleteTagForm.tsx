'use client'

import { useParams } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useActionState } from 'react'

import { useCloseDialogOn } from '@/shared/lib/hooks/useCloseDialogOn'
import { useNotificationManager } from '@/shared/lib/hooks/useNotificationManager'
import { Tag } from '@/shared/lib/prisma/generated/client'
import { Button } from '@/shared/ui/button'
import { FieldDescription, FieldLegend, FieldSet } from '@/shared/ui/field'

import { deleteTagAction } from '../api/deleteTagAction'
import type { DeleteTagFormState } from '../model/types'

const initialState: DeleteTagFormState = {
  isSuccess: false,
  message: null,
}

export function DeleteTagForm({ tagId }: { tagId: Tag['id'] }) {
  const params = useParams<{ tagId?: string }>()
  const locale = useLocale()

  const [state, formAction, isPending] = useActionState(
    deleteTagAction.bind(null, tagId, params.tagId === tagId, locale),
    initialState,
  )
  useNotificationManager(state.message, state.isSuccess, !isPending)
  useCloseDialogOn(state.isSuccess)

  return (
    <form action={formAction}>
      <FieldSet disabled={isPending}>
        <FieldLegend>Delete Tag?</FieldLegend>
        <FieldDescription>
          Are you sure you want to delete this Tag?
        </FieldDescription>
        <Button type='submit'>Delete</Button>
      </FieldSet>
    </form>
  )
}
