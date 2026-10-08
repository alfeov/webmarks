'use client'

import { useParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useActionState } from 'react'

import { useCloseDialogOn } from '@/shared/lib/hooks/useCloseDialogOn'
import { useNotificationManager } from '@/shared/lib/hooks/useNotificationManager'
import type { Tag } from '@/shared/lib/prisma/generated/client'
import { Button } from '@/shared/ui/button'
import { FieldDescription, FieldLegend, FieldSet } from '@/shared/ui/field'

import { deleteTagAction } from '../api/deleteTagAction'
import type { DeleteTagFormState } from '../model/types'

const initialState: DeleteTagFormState = {
  isSuccess: false,
}

export function DeleteTagForm({ tagId }: { tagId: Tag['id'] }) {
  const params = useParams<{ tagId?: string }>()

  const locale = useLocale()
  const t = useTranslations('DeleteTagForm')

  const [state, formAction, isPending] = useActionState(
    deleteTagAction.bind(null, tagId, params.tagId === tagId, locale),
    initialState,
  )
  useNotificationManager(state.message, state.isSuccess, !isPending)
  useCloseDialogOn(state.isSuccess)

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
