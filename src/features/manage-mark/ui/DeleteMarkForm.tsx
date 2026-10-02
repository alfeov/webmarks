'use client'

import { useTranslations } from 'next-intl'
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
}

export function DeleteMarkForm({ markId }: { markId: WebMark['id'] }) {
  const [state, formAction, isPending] = useActionState(
    deleteMarkAction.bind(null, markId),
    initialState,
  )
  useNotificationManager(state.message, state.isSuccess, !isPending)
  useCloseDialogOn(state.isSuccess)

  const t = useTranslations('deleteMarkForm')

  return (
    <form action={formAction}>
      <FieldSet disabled={isPending}>
        <FieldLegend>{t('formTitle')}</FieldLegend>
        <FieldDescription>{t('formDescription')}</FieldDescription>
        <Button type='submit'>{t('submit')}</Button>
      </FieldSet>
    </form>
  )
}
