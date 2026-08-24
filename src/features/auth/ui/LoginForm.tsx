'use client'

import { useActionState } from 'react'

import { Button } from '@/shared/ui/button'
import { FieldSet } from '@/shared/ui/field'
import { InputField } from '@/shared/ui/InputField'

import { login } from '../model/login'

type LoginFormProps = React.ComponentProps<'form'>

export function LoginForm({ ...props }: LoginFormProps) {
  const [state, formAction, isPending] = useActionState(login, undefined)

  return (
    <form className='flex flex-col gap-[20px]' {...props} action={formAction}>
      <FieldSet disabled={isPending}>
        <InputField
          label='Email'
          placeholder='Enter your email address'
          type='text'
          name='email'
          errors={state?.errors.email}
        />
        <InputField
          label='Password'
          placeholder='Enter your password'
          type='password'
          name='password'
          errors={state?.errors.password}
        />
        <Button type='submit'>Login</Button>
      </FieldSet>
    </form>
  )
}
