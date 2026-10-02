'use client'

import { useTranslations } from 'next-intl'
import { useActionState } from 'react'

import { useCloseDialogOn } from '@/shared/lib/hooks/useCloseDialogOn'
import { useNotificationManager } from '@/shared/lib/hooks/useNotificationManager'
import { WebMark } from '@/shared/lib/prisma/generated/client'
import { Button } from '@/shared/ui/button'
import { FieldDescription, FieldLegend, FieldSet } from '@/shared/ui/field'
import { InputField } from '@/shared/ui/InputField'
import { TextareaField } from '@/shared/ui/TextareaField'

import { editMarkAction } from '../api/editMarkAction'
import { EDIT_MARK_FORMDATA } from '../lib/constants'
import { EditMarkFormState } from '../model/types'

type EditMarkFormProps = WebMark

const initialState: EditMarkFormState = {
  isSuccess: false,
}

export function EditMarkForm({ ...mark }: EditMarkFormProps) {
  const [state, formAction, isPending] = useActionState(
    editMarkAction.bind(null, mark.id),
    initialState,
  )
  useNotificationManager(state.message, state.isSuccess, !isPending)
  useCloseDialogOn(state.isSuccess)

  const tMarkForm = useTranslations('markForm')
  const tEditMarkForm = useTranslations('editMarkForm')

  return (
    <form action={formAction}>
      <FieldSet disabled={isPending}>
        <FieldLegend>{tEditMarkForm('formTitle')}</FieldLegend>
        <FieldDescription>{tEditMarkForm('formDescription')}</FieldDescription>
        <InputField
          autoFocus
          name={EDIT_MARK_FORMDATA.URL}
          errors={state.errors?.url}
          defaultValue={mark.url}
          label={tMarkForm('fields.url.label')}
          placeholder='https://webmarks.com'
          req
        />
        <InputField
          name={EDIT_MARK_FORMDATA.TITLE}
          errors={state.errors?.title}
          defaultValue={mark.title}
          label={tMarkForm('fields.title.label')}
          placeholder='WebMark'
          req
        />
        <TextareaField
          name={EDIT_MARK_FORMDATA.DESCRIPTION}
          errors={state.errors?.description}
          defaultValue={mark.description}
          label={tMarkForm('fields.description.label')}
          placeholder={tMarkForm('fields.description.placeholder')}
          req
        />
        <InputField
          name={EDIT_MARK_FORMDATA.LOGO_URL}
          errors={state.errors?.logoUrl}
          defaultValue={mark.logoUrl ?? ''}
          label={tMarkForm('fields.logoUrl.label')}
          placeholder='https://logo.com'
        />
        <Button type='submit'>{tEditMarkForm('submit')}</Button>
      </FieldSet>
    </form>
  )
}
