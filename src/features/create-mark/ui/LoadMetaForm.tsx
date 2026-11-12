'use client'

import { useTranslations } from 'next-intl'
import { useActionState, useEffect, useState } from 'react'

import { loadMetaAction } from '@/features/create-mark/api/loadMetaAction'
import { LOAD_META_FORM } from '@/features/create-mark/lib/constants'
import { useMetaActionContext } from '@/features/create-mark/model/MetaContext'
import type { LoadMetaFormState } from '@/features/create-mark/model/types'
import { TEST_IDS } from '@/shared/config/testids'
import { useFetchingIndicatorManager } from '@/shared/lib/hooks/useFetchingIndicatorManager'
import { useNotificationManager } from '@/shared/lib/hooks/useNotificationManager'
import { paste } from '@/shared/lib/utils/paste'
import { showToast } from '@/shared/lib/utils/showToast'
import { Field, FieldError, FieldLabel } from '@/shared/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/shared/ui/input-group'

import { ClipboardPaste, CloudDownload } from 'lucide-react'

const initialState: LoadMetaFormState = {
  isSuccess: false,
}

export function LoadMetaForm() {
  const [url, setUrl] = useState('')

  const [state, formAction, isPending] = useActionState(
    loadMetaAction,
    initialState,
  )

  const setMetadata = useMetaActionContext()
  useEffect(() => {
    if (state.data) setMetadata(state.data)
  }, [state.data, setMetadata])

  useNotificationManager(state.message, state.isSuccess, !isPending)
  useFetchingIndicatorManager(isPending)

  const t = useTranslations()

  const handlePasteClick = async () => {
    const { clipText, error } = await paste()
    if (error) {
      showToast(t('toast.errorTitle'), t(`codes.${error}`), false)
      return
    }
    setUrl(clipText)
  }

  return (
    <form className='grid gap-[30px]' action={formAction}>
      <fieldset disabled={isPending}>
        <Field data-invalid={Boolean(state.errors)}>
          <FieldLabel>{t('LoadMetaForm.fields.url.label')}</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupButton
                aria-label={t('LoadMetaForm.buttons.paste.ariaLabel')}
                onClick={handlePasteClick}
                data-testid={TEST_IDS.CLICKABLE.BUTTON.PASTE}
              >
                <ClipboardPaste /> {t('LoadMetaForm.buttons.paste.title')}
              </InputGroupButton>
            </InputGroupAddon>

            <InputGroupInput
              autoFocus
              placeholder={t('LoadMetaForm.fields.url.placeholder')}
              name={LOAD_META_FORM.URL}
              aria-invalid={Boolean(state.errors)}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              data-testid={`${LOAD_META_FORM.URL}-input`}
            />

            <InputGroupAddon align='inline-end'>
              <InputGroupButton
                aria-label={t('LoadMetaForm.buttons.load.ariaLabel')}
                type='submit'
                disabled={isPending}
                data-testid={TEST_IDS.CLICKABLE.BUTTON.LOAD}
              >
                {t('LoadMetaForm.buttons.load.title')}
                <CloudDownload data-icon='inline-end' />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <FieldError
            data-testid={`${LOAD_META_FORM.URL}-error`}
            errors={state.errors?.loadUrl?.map((code) => ({
              message: t(`errors.${code}`),
            }))}
          />
        </Field>
      </fieldset>
    </form>
  )
}
