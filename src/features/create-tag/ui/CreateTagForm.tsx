'use client'

import { useActionState } from 'react'

import { useCloseDialogOn } from '@/shared/lib/hooks/useCloseDialogOn'
import { useNotificationManager } from '@/shared/lib/hooks/useNotificationManager'
import { Button } from '@/shared/ui/button'
import { FieldDescription, FieldLegend, FieldSet } from '@/shared/ui/field'
import { InputField } from '@/shared/ui/InputField'

import { createTagAction } from '../api/createTagAction'
import { CREATE_TAG_FORMDATA } from '../lib/constants'
import { CreateTagFormState } from '../model/types'

const initialState = {
  isSuccess: false,
  errors: null,
  message: null,
}

export function CreateTagForm() {
  const [state, formAction, isPending] = useActionState<
    CreateTagFormState,
    FormData
  >(createTagAction, initialState)
  useNotificationManager(state.message, state.isSuccess, !isPending)
  useCloseDialogOn(state.isSuccess)

  return (
    <form action={formAction}>
      <FieldSet disabled={isPending}>
        <FieldLegend>Create new Tag</FieldLegend>
        <FieldDescription>
          Please fill in the fields below to create new Tag
        </FieldDescription>
        <InputField
          autoFocus
          label='Title'
          req
          placeholder='Some Tag Name...'
          name={CREATE_TAG_FORMDATA.TITLE}
          errors={state.errors?.title}
        />
        <Button type='submit'>Create Tag</Button>
      </FieldSet>
    </form>
  )
}
