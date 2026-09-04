'use client'

import { useActionState } from 'react'

import { useCloseDialogOn } from '@/shared/lib/hooks/useCloseDialogOn'
import { useNotificationManager } from '@/shared/lib/hooks/useNotificationManager'
import { Button } from '@/shared/ui/button'
import { FieldSet } from '@/shared/ui/field'
import { InputField } from '@/shared/ui/InputField'

import { signupAction } from '../api/signupAction'
import { SIGNUP_FORMDATA } from '../lib/constants'
import type { SignupFormState } from '../model/types'

export const initialState = {
  isSuccess: false,
  errors: null,
  message: null,
}

export function SignupForm() {
  const [state, formAction, isPending] = useActionState<
    SignupFormState,
    FormData
  >(signupAction, initialState)
  useNotificationManager(state.message, state.isSuccess, !isPending)
  useCloseDialogOn(state.isSuccess)

  return (
    <form className='flex flex-col gap-[20px]' action={formAction}>
      <FieldSet disabled={isPending}>
        <InputField
          label='Username'
          placeholder='Enter username'
          type='text'
          name={SIGNUP_FORMDATA.USERNAME}
          errors={state?.errors?.username}
        />
        <InputField
          label='Email'
          placeholder='Enter your email address'
          type='text'
          name={SIGNUP_FORMDATA.EMAIL}
          errors={state?.errors?.email}
        />
        <InputField
          label='Password'
          placeholder='Enter your password'
          type='password'
          name={SIGNUP_FORMDATA.PASSWORD}
          errors={state?.errors?.password}
        />
        <InputField
          label='Confirm password'
          placeholder='Confirm your password'
          type='password'
          name={SIGNUP_FORMDATA.CONFIRM_PASSWORD}
          errors={state?.errors?.confirmPassword}
        />
        <Button type='submit'>Sign Up</Button>
      </FieldSet>
    </form>
  )
}
