'use client'

import { useActionState } from 'react'

import { useNotificationManager } from '@/shared/lib/useNotificationManager'
import { Button } from '@/shared/ui/button'
import { FieldSet } from '@/shared/ui/field'
import { InputField } from '@/shared/ui/InputField'

import { initialState, login } from '../api/login'
import { LOGIN_FORMDATA } from '../model/constants'
import { useOnAuth } from '../model/useOnAuth'

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialState)
  useNotificationManager(state.message, state.isSuccess)
  useOnAuth(state.isSuccess)

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
