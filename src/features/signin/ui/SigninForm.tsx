'use client'

import { useActionState } from 'react'

import { useCloseDialogOn } from '@/shared/lib/hooks/useCloseDialogOn'
import { useNotificationManager } from '@/shared/lib/hooks/useNotificationManager'
import { Button } from '@/shared/ui/button'
import { FieldSet } from '@/shared/ui/field'
import { InputField } from '@/shared/ui/InputField'

import { signinAction } from '../api/signinAction'
import { SIGNIN_FORMDATA } from '../lib/constants'
import type { SigninFormState } from '../model/types'

export const initialState = {
  isSuccess: false,
  errors: null,
  message: null,
}

export function SigninForm() {
  const [state, formAction, isPending] = useActionState<
    SigninFormState,
    FormData
  >(signinAction, initialState)
  useNotificationManager(state.message, state.isSuccess, !isPending)
  useCloseDialogOn(state.isSuccess)

  return (
    <form className='flex flex-col gap-[20px]' action={formAction}>
      <FieldSet disabled={isPending}>
        <InputField
          autoFocus
          label='Email'
          placeholder='Enter your email address'
          type='text'
          name={SIGNIN_FORMDATA.EMAIL}
          errors={state?.errors?.email}
        />
        <InputField
          label='Password'
          placeholder='Enter your password'
          type='password'
          name={SIGNIN_FORMDATA.PASSWORD}
          errors={state?.errors?.password}
        />
        <Button type='submit'>Login</Button>
      </FieldSet>
    </form>
  )
}
