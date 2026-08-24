'use client'

import { InputField } from '@/shared/ui/InputField'

type SignupFormProps = React.ComponentProps<'form'>

export function SignupForm({ ...props }: SignupFormProps) {
  return (
    <form className='flex flex-col gap-[20px]' {...props}>
      <InputField
        label='Email'
        placeholder='Enter your email address'
        type='text'
        name='email'
      />
      <InputField
        label='Password'
        placeholder='Enter your password'
        type='password'
        name='password'
      />
      <InputField
        label='Confirm password'
        placeholder='Confirm your password'
        type='password'
        name='confirmPassword'
      />
    </form>
  )
}
