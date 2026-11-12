'use client'

import { useTranslations } from 'next-intl'
import { useActionState } from 'react'

import { deleteMarkAction } from '@/features/manage-mark/api/deleteMarkAction'
import type { DeleteMarkFormState } from '@/features/manage-mark/model/types'
import { TEST_IDS } from '@/shared/config/testids'
import { useCloseDialogOn } from '@/shared/lib/hooks/useCloseDialogOn'
import { useFetchingIndicatorManager } from '@/shared/lib/hooks/useFetchingIndicatorManager'
import { useNotificationManager } from '@/shared/lib/hooks/useNotificationManager'
import type { WebMark } from '@/shared/lib/prisma/generated/client'
import { Button } from '@/shared/ui/button'
import { FieldDescription, FieldLegend, FieldSet } from '@/shared/ui/field'

const initialState: DeleteMarkFormState = {
  isSuccess: false,
}

export function DeleteMarkForm({ markId }: { markId: WebMark['id'] }) {
  const [state, formAction, isPending] = useActionState(
    deleteMarkAction.bind(null, markId),
    initialState,
  )
  useNotificationManager(state.message, state.isSuccess, !isPending)
  useFetchingIndicatorManager(isPending)
  useCloseDialogOn(state.isSuccess)

  const t = useTranslations('DeleteMarkForm')

  return (
    <form action={formAction}>
      <FieldSet disabled={isPending}>
        <FieldLegend>{t('formTitle')}</FieldLegend>
        <FieldDescription>{t('formDescription')}</FieldDescription>
        <Button type='submit' data-testid={TEST_IDS.CLICKABLE.BUTTON.SUBMIT}>
          {t('submit')}
        </Button>
      </FieldSet>
    </form>
  )
}
