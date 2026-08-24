'use client'

import { InputField } from '@/shared/ui/InputField'

type LoginFormProps = React.ComponentProps<'form'>

export function LoginForm({ ...props }: LoginFormProps) {
  return (
    <form className='flex flex-col gap-[20px]' {...props}>
      <InputField
        label='Email'
        placeholder='Enter your email address'
        type='text'
      />
      <InputField
        label='Password'
        placeholder='Enter your password'
        type='password'
      />
    </form>
  )
}
