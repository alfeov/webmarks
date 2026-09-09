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

const initialState: EditTagFormState = {
  isSuccess: false,
  errors: null,
  message: null,
}

export function EditTagForm({ ...tag }: EditTagFormProps) {
  const [state, formAction, isPending] = useActionState(
    editTagAction.bind(null, tag.id),
    initialState,
  )
  useNotificationManager(state.message, state.isSuccess, !isPending)
  useCloseDialogOn(state.isSuccess)

  return (
    <form action={formAction}>
      <FieldSet disabled={isPending}>
        <FieldLegend>Edit Tag</FieldLegend>
        <FieldDescription>
          Please fill in the fields below to edit Tag
        </FieldDescription>
        <InputField
          label='Title'
          req
          placeholder={tag.title}
          name={EDIT_TAG_FORMDATA.TITLE}
          errors={state.errors?.title}
        />
        <Button type='submit'>Edit Tag</Button>
      </FieldSet>
    </form>
  )
}
