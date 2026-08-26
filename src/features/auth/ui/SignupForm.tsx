'use client'

import { useActionState } from 'react'

import { Button } from '@/shared/ui/button'
import { FieldSet } from '@/shared/ui/field'
import { InputField } from '@/shared/ui/InputField'

import { signup } from '../api/signup'
import { SIGNUP_FORMDATA } from '../model/constants'
import { useAuthToastManager } from '../model/useAuthToastManager'

type SignupFormProps = React.ComponentProps<'form'>

export function SignupForm({ ...props }: SignupFormProps) {
  const [state, formAction, isPending] = useActionState(signup, undefined)
  useAuthToastManager(state?.message, state?.isSuccess)

  return (
    <form className='flex flex-col gap-[20px]' {...props} action={formAction}>
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
