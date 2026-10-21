'use client'

import { useTranslations } from 'next-intl'
import { useActionState } from 'react'

import { InputField } from '@/shared/components/InputField'
import { TEST_IDS } from '@/shared/config/testids'
import { useCloseDialogOn } from '@/shared/lib/hooks/useCloseDialogOn'
import { useNotificationManager } from '@/shared/lib/hooks/useNotificationManager'
import { Button } from '@/shared/ui/button'
import { FieldSet } from '@/shared/ui/field'

import { signinAction } from '../api/signinAction'
import { SIGNIN_FORM } from '../lib/constants'
import type { SigninFormState } from '../model/types'

export const initialState: SigninFormState = {
  isSuccess: false,
}

export function SigninForm() {
  const [state, formAction, isPending] = useActionState<
    SigninFormState,
    FormData
  >(signinAction, initialState)
  useNotificationManager(state.message, state.isSuccess, !isPending)
  useCloseDialogOn(state.isSuccess)

  const tAuthFrom = useTranslations('AuthForm')
  const tSigninForm = useTranslations('SigninForm')

  return (
    <form
      className='flex flex-col gap-[20px]'
      action={formAction}
      data-testid={TEST_IDS.STATIC.FORMS.SIGNIN}
    >
      <FieldSet disabled={isPending}>
        <InputField
          autoFocus
          label={tAuthFrom('fields.email.label')}
          placeholder={tAuthFrom('fields.email.placeholder')}
          type='text'
          name={SIGNIN_FORM.EMAIL}
          errors={state?.errors?.email}
        />
        <InputField
          label={tAuthFrom('fields.password.label')}
          placeholder={tAuthFrom('fields.password.label')}
          type='password'
          name={SIGNIN_FORM.PASSWORD}
          errors={state?.errors?.password}
        />
        <Button type='submit'>{tSigninForm('submit')}</Button>
      </FieldSet>
    </form>
  )
}
