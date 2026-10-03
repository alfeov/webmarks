'use client'

import { useTranslations } from 'next-intl'
import { useActionState } from 'react'

import { useCloseDialogOn } from '@/shared/lib/hooks/useCloseDialogOn'
import { useNotificationManager } from '@/shared/lib/hooks/useNotificationManager'
import { Button } from '@/shared/ui/button'
import { FieldSet } from '@/shared/ui/field'
import { InputField } from '@/shared/ui/InputField'

import { signupAction } from '../api/signupAction'
import { SIGNUP_FORMDATA } from '../lib/constants'
import type { SignupFormState } from '../model/types'

export const initialState: SignupFormState = {
  isSuccess: false,
}

export function SignupForm() {
  const [state, formAction, isPending] = useActionState<
    SignupFormState,
    FormData
  >(signupAction, initialState)
  useNotificationManager(state.message, state.isSuccess, !isPending)
  useCloseDialogOn(state.isSuccess)

  const tAuthFrom = useTranslations('AuthForm')
  const tSignupForm = useTranslations('SignupForm')

  return (
    <form className='flex flex-col gap-[20px]' action={formAction}>
      <FieldSet disabled={isPending}>
        <InputField
          autoFocus
          label={tSignupForm('fields.username.label')}
          placeholder={tSignupForm('fields.username.placeholder')}
          type='text'
          name={SIGNUP_FORMDATA.USERNAME}
          errors={state?.errors?.username}
        />
        <InputField
          label={tAuthFrom('fields.email.label')}
          placeholder={tAuthFrom('fields.email.placeholder')}
          type='text'
          name={SIGNUP_FORMDATA.EMAIL}
          errors={state?.errors?.email}
        />
        <InputField
          label={tAuthFrom('fields.password.label')}
          placeholder={tAuthFrom('fields.password.label')}
          type='password'
          name={SIGNUP_FORMDATA.PASSWORD}
          errors={state?.errors?.password}
        />
        <InputField
          label={tSignupForm('fields.confirmPassword.label')}
          placeholder={tSignupForm('fields.confirmPassword.placeholder')}
          type='password'
          name={SIGNUP_FORMDATA.CONFIRM_PASSWORD}
          errors={state?.errors?.confirmPassword}
        />
        <Button type='submit'>{tSignupForm('submit')}</Button>
      </FieldSet>
    </form>
  )
}
