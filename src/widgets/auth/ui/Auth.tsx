'use client'

import { useTranslations } from 'next-intl'
import { Activity, useState } from 'react'

import { SigninForm } from '@/features/signin/ui/SigninForm'
import { SignupForm } from '@/features/signup/ui/SignupForm'
import { Button } from '@/shared/ui/button'
import { FieldDescription, FieldLegend, FieldSet } from '@/shared/ui/field'

type Mode = 'signin' | 'signup'

export function Auth({ initialMode }: { initialMode: Mode }) {
  const [mode, setMode] = useState<Mode>(initialMode)

  const t = useTranslations('Auth')

  return (
    <FieldSet>
      <FieldLegend>
        {mode === 'signin' ? t('signinFormTitle') : t('signupFormTitle')}
      </FieldLegend>
      <FieldDescription>
        {mode === 'signin'
          ? t('signinFormDescription')
          : t('signupFormDescription')}
        <br />
        <span className='flex justify-between'>
          <span>
            {mode === 'signin' ? t('signinQuestion') : t('signupQuestion')}
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
            {mode === 'signin' ? t('signinButton') : t('signupButton')}
          </Button>
        </span>
      </FieldDescription>
      <Activity mode={mode === 'signin' ? 'visible' : 'hidden'}>
        <SigninForm />
      </Activity>
      <Activity mode={mode === 'signup' ? 'visible' : 'hidden'}>
        <SignupForm />
      </Activity>
    </FieldSet>
  )
}
