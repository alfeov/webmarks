'use client'

import { useActionState } from 'react'

import { useCloseDialogOn } from '@/shared/lib/hooks/useCloseDialogOn'
import { useNotificationManager } from '@/shared/lib/hooks/useNotificationManager'
import { User } from '@/shared/lib/prisma/generated/client'
import { Button } from '@/shared/ui/button'
import { FieldDescription, FieldLegend, FieldSet } from '@/shared/ui/field'
import { InputField } from '@/shared/ui/InputField'

import { editAvatarAction } from '../api/editAvatarAction'
import { EDIT_AVATAR_FORMDATA } from '../lib/constants'
import { EditAvatarFormState } from '../model/types'

const initialState: EditAvatarFormState = {
  isSuccess: false,
  errors: null,
  message: null,
}

export function EditAvatarForm({ avatarUrl }: Pick<User, 'avatarUrl'>) {
  const [state, formAction, isPending] = useActionState(
    editAvatarAction,
    initialState,
  )
  useNotificationManager(state.message, state.isSuccess, !isPending)
  useCloseDialogOn(state.isSuccess)

  return (
    <form action={formAction}>
      <FieldSet disabled={isPending}>
        <FieldLegend>Edit Avatar</FieldLegend>
        <FieldDescription>
          Please fill in the field below to edit Avatar
        </FieldDescription>
        <InputField
          autoFocus
          label='Avatar URL'
          req
          defaultValue={avatarUrl ?? ''}
          placeholder='https://logo.com'
          name={EDIT_AVATAR_FORMDATA.AVATAR_URL}
          errors={state.errors?.avatarUrl}
        />
        <Button type='submit'>Edit Avatar</Button>
      </FieldSet>
    </form>
  )
}
