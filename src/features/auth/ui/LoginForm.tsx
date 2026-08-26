'use client'

import { useActionState } from 'react'

import { useNotificationManager } from '@/shared/lib/useNotificationManager'
import { Button } from '@/shared/ui/button'
import { FieldSet } from '@/shared/ui/field'
import { InputField } from '@/shared/ui/InputField'

import { login } from '../api/login'
import { LOGIN_FORMDATA } from '../lib/constants'
import { useCloseDialogOnAuth } from '../lib/useCloseDialogOnAuth'

export const initialState = {
  isSuccess: false,
  errors: null,
  message: null,
}

export function LoginForm() {
  const [state, formAction, isPending] = useActionState<
    LoginFormState,
    FormData
  >(login, initialState)
  useNotificationManager(state.message, state.isSuccess)
  useCloseDialogOnAuth(state.isSuccess)

  return (
    <form className='flex flex-col gap-[20px]' action={formAction}>
      <FieldSet disabled={isPending}>
        <InputField
          label='Email'
          placeholder='Enter your email address'
          type='text'
          name={LOGIN_FORMDATA.EMAIL}
          errors={state?.errors?.email}
        />
        <InputField
          label='Password'
          placeholder='Enter your password'
          type='password'
          name={LOGIN_FORMDATA.PASSWORD}
          errors={state?.errors?.password}
        />
        <Button type='submit'>Login</Button>
      </FieldSet>
    </form>
  )
}
