'use client'

import { useTranslations } from 'next-intl'
import { useActionState } from 'react'

import { useCloseDialogOn } from '@/shared/lib/hooks/useCloseDialogOn'
import { useNotificationManager } from '@/shared/lib/hooks/useNotificationManager'
import { Button } from '@/shared/ui/button'
import { FieldDescription, FieldLegend, FieldSet } from '@/shared/ui/field'
import { InputField } from '@/shared/ui/InputField'

import { createTagAction } from '../api/createTagAction'
import { CREATE_TAG_FORMDATA } from '../lib/constants'
import type { CreateTagFormState } from '../model/types'

const initialState: CreateTagFormState = {
  isSuccess: false,
}

export function CreateTagForm() {
  const [state, formAction, isPending] = useActionState(
    createTagAction,
    initialState,
  )
  useNotificationManager(state.message, state.isSuccess, !isPending)
  useCloseDialogOn(state.isSuccess)

  const t = useTranslations('CreateTagForm')

  return (
    <form action={formAction}>
      <FieldSet disabled={isPending}>
        <FieldLegend>{t('formTitle')}</FieldLegend>
        <FieldDescription>{t('formDescription')}</FieldDescription>
        <InputField
          autoFocus
          label={t('fields.title.label')}
          req
          placeholder={t('fields.title.placeholder')}
          name={CREATE_TAG_FORMDATA.TITLE}
          errors={state.errors?.title}
        />
        <Button type='submit'>{t('submit')}</Button>
      </FieldSet>
    </form>
  )
}
