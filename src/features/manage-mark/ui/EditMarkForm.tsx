'use client'

import { useActionState } from 'react'

import { useCloseDialogOn } from '@/shared/lib/hooks/useCloseDialogOn'
import { useNotificationManager } from '@/shared/lib/hooks/useNotificationManager'
import { WebMark } from '@/shared/lib/prisma/generated/client'
import { Button } from '@/shared/ui/button'
import { FieldDescription, FieldLegend, FieldSet } from '@/shared/ui/field'
import { InputField } from '@/shared/ui/InputField'

import { editMarkAction } from '../api/editMarkAction'
import { EDIT_MARK_FORMDATA } from '../lib/constants'
import { EditMarkFormState } from '../model/types'

type EditMarkFormProps = WebMark

const initialState: EditMarkFormState = {
  isSuccess: false,
  errors: null,
  message: null,
}

export function EditMarkForm({ ...mark }: EditMarkFormProps) {
  const [state, formAction, isPending] = useActionState(
    editMarkAction.bind(null, mark.id),
    initialState,
  )
  useNotificationManager(state.message, state.isSuccess, !isPending)
  useCloseDialogOn(state.isSuccess)

  return (
    <form action={formAction}>
      <FieldSet disabled={isPending}>
        <FieldLegend>Edit WebMark</FieldLegend>
        <FieldDescription>
          Please fill in the fields below to edit WebMark
        </FieldDescription>
        <InputField
          name={EDIT_MARK_FORMDATA.URL}
          errors={state.errors?.url}
          defaultValue={mark.url}
          label='URL'
          placeholder='https://webmarks.com'
          req
        />
        <InputField
          name={EDIT_MARK_FORMDATA.TITLE}
          errors={state.errors?.title}
          defaultValue={mark.title}
          label='Title'
          placeholder='WebMark'
          req
        />
        <InputField
          name={EDIT_MARK_FORMDATA.DESCRIPTION}
          errors={state.errors?.description}
          defaultValue={mark.description}
          label='Description'
          placeholder='Some cool description to your link'
          req
        />
        <InputField
          name={EDIT_MARK_FORMDATA.LOGO_URL}
          errors={state.errors?.logoUrl}
          defaultValue={mark.logoUrl ?? ''}
          label='Logo URL'
          placeholder='https://logo.com'
        />
        <Button type='submit'>Edit WebMark</Button>
      </FieldSet>
    </form>
  )
}
