'use client'

import { useState } from 'react'

import { SigninForm } from '@/features/signin/ui/SigninForm'
import { SignupForm } from '@/features/signup/ui/SignupForm'
import { Button } from '@/shared/ui/button'
import { FieldDescription, FieldLegend, FieldSet } from '@/shared/ui/field'

type Mode = 'signin' | 'signup'

export function Auth({ initialMode }: { initialMode: Mode }) {
  const [mode, setMode] = useState<Mode>(initialMode)

  return (
    <FieldSet>
      <FieldLegend>
        {mode === 'signin' ? 'Login to your account' : 'Create new account'}
      </FieldLegend>
      <FieldDescription>
        Please fill in the fields below to
        {mode === 'signin' ? ' login to your account' : ' create new account'}
        <br />
        <span className='flex justify-between'>
          <span>
            {mode === 'signin'
              ? "Hasn't account yet?"
              : 'Already has an account?'}
          </span>
          <Button
            variant='link'
            onClick={
              mode === 'signin'
                ? () => setMode('signup')
                : () => setMode('signin')
            }
            className='h-auto'
          >
            {mode === 'signin' ? 'Sign Up' : 'Login'}
          </Button>
        </span>
      </FieldDescription>
      {mode === 'signin' ? <SigninForm /> : <SignupForm />}
    </FieldSet>
  )
}
