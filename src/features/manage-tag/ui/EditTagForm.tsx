'use client'

import { useActionState } from 'react'

import { useCloseDialogOn } from '@/shared/lib/hooks/useCloseDialogOn'
import { useNotificationManager } from '@/shared/lib/hooks/useNotificationManager'
import { Tag } from '@/shared/lib/prisma/generated/client'
import { Button } from '@/shared/ui/button'
import { FieldDescription, FieldLegend, FieldSet } from '@/shared/ui/field'
import { InputField } from '@/shared/ui/InputField'

import { editTagAction } from '../api/editTagAction'
import { EDIT_TAG_FORMDATA } from '../lib/constants'
import type { EditTagFormState } from '../model/types'

type EditTagFormProps = Tag

const initialState = {
  isSuccess: false,
  errors: null,
  message: null,
}

export function EditTagForm({ ...tag }: EditTagFormProps) {
  const [state, formAction, isPending] = useActionState<
    EditTagFormState,
    FormData
  >(editTagAction, initialState)
  useNotificationManager(state.message, state.isSuccess)
  useCloseDialogOn(state.isSuccess)

  return (
    <form action={formAction}>
      <FieldSet disabled={isPending}>
        <FieldLegend>Edit Tag</FieldLegend>
        <FieldDescription>
          Please fill in the fields below to edit Tag
        </FieldDescription>
        <input hidden name={EDIT_TAG_FORMDATA.ID} value={tag.id} readOnly />
        <InputField
          label='Title'
          req
          placeholder={tag.title}
          name={EDIT_TAG_FORMDATA.TITLE}
          errors={state.errors?.title}
        />
        <Button type='submit'>Create Tag</Button>
      </FieldSet>
    </form>
  )
}
