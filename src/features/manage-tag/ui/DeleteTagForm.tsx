'use client'

import { useParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useActionState } from 'react'

import { deleteTagAction } from '@/features/manage-tag/api/deleteTagAction'
import type { DeleteTagFormState } from '@/features/manage-tag/model/types'
import { TEST_IDS } from '@/shared/config/testids'
import { useCloseDialogOn } from '@/shared/lib/hooks/useCloseDialogOn'
import { useFetchingIndicatorManager } from '@/shared/lib/hooks/useFetchingIndicatorManager'
import { useNotificationManager } from '@/shared/lib/hooks/useNotificationManager'
import type { Tag } from '@/shared/lib/prisma/generated/client'
import { Button } from '@/shared/ui/button'
import { FieldDescription, FieldLegend, FieldSet } from '@/shared/ui/field'

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
  useFetchingIndicatorManager(isPending)
  useNotificationManager(state.message, state.isSuccess, !isPending)
  useCloseDialogOn(state.isSuccess)

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
