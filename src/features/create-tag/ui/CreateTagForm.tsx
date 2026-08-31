'use client'

import { useActionState } from 'react'

import { useNotificationManager } from '@/shared/lib/useNotificationManager'
import { Button } from '@/shared/ui/button'
import { FieldSet } from '@/shared/ui/field'
import { InputField } from '@/shared/ui/InputField'

import { createTagAction } from '../api/createTagAction'
import { TAG_FORMDATA } from '../lib/constants'
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
  useNotificationManager(state.message, state.isSuccess)

  return (
    <form action={formAction}>
      <FieldSet disabled={isPending}>
        <InputField
          label='Title'
          req
          placeholder='Some Tag Name...'
          name={TAG_FORMDATA.TITLE}
          errors={state.errors?.title}
        />
        <Button type='submit'>Create Tag</Button>
      </FieldSet>
    </form>
  )
}
