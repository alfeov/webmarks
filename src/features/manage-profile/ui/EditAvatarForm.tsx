'use client'

import { useTranslations } from 'next-intl'
import { useActionState } from 'react'

import { InputField } from '@/shared/components/InputField'
import { TEST_IDS } from '@/shared/config/testids'
import { useCloseDialogOn } from '@/shared/lib/hooks/useCloseDialogOn'
import { useFetchingIndicatorManager } from '@/shared/lib/hooks/useFetchingIndicatorManager'
import { useNotificationManager } from '@/shared/lib/hooks/useNotificationManager'
import type { User } from '@/shared/lib/prisma/generated/client'
import { Button } from '@/shared/ui/button'
import { FieldDescription, FieldLegend, FieldSet } from '@/shared/ui/field'

import { editAvatarAction } from '../api/editAvatarAction'
import { EDIT_AVATAR_FORM } from '../lib/constants'
import type { EditAvatarFormState } from '../model/types'

const initialState: EditAvatarFormState = {
  isSuccess: false,
}

export function EditAvatarForm({ avatarUrl }: Pick<User, 'avatarUrl'>) {
  const [state, formAction, isPending] = useActionState(
    editAvatarAction,
    initialState,
  )
  useFetchingIndicatorManager(isPending)
  useNotificationManager(state.message, state.isSuccess, !isPending)
  useCloseDialogOn(state.isSuccess)

  const t = useTranslations('EditAvatarForm')

  return (
    <form action={formAction}>
      <FieldSet disabled={isPending}>
        <FieldLegend>{t('formTitle')}</FieldLegend>
        <FieldDescription>{t('formDescription')}</FieldDescription>
        <InputField
          autoFocus
          label={t('label')}
          req
          defaultValue={avatarUrl ?? ''}
          placeholder='https://logo.com'
          name={EDIT_AVATAR_FORM.AVATAR_URL}
          errors={state.errors?.avatarUrl}
        />
        <Button type='submit' data-testid={TEST_IDS.CLICKABLE.BUTTON.SUBMIT}>
          {t('submit')}
        </Button>
      </FieldSet>
    </form>
  )
}
