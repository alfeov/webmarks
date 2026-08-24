'use client'

import { useActionState } from 'react'

import { Button } from '@/shared/ui/button'
import { FieldSet } from '@/shared/ui/field'
import { InputField } from '@/shared/ui/InputField'

import { signup } from '../model/signup'

type SignupFormProps = React.ComponentProps<'form'>

export function SignupForm({ ...props }: SignupFormProps) {
  const [state, formAction, isPending] = useActionState(signup, undefined)

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
        <InputField
          label='Confirm password'
          placeholder='Confirm your password'
          type='password'
          name='confirmPassword'
          errors={state?.errors.confirmPassword}
        />
        <Button type='submit'>Sign Up</Button>
      </FieldSet>
    </form>
  )
}
