'use client'

import { useTranslations } from 'next-intl'
import { useActionState, useEffect, useState } from 'react'

import { loadMetaAction } from '@/features/create-mark/api/loadMetaAction'
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

import { LOAD_META_FORMDATA } from '../lib/constants'
import { useMetaContext } from '../model/MetaContext'
import type { LoadMetaFormState } from '../model/types'

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

  const { setMetadata } = useMetaContext()
  useEffect(() => {
    if (state.data) setMetadata(state.data)
  }, [state.data, setMetadata])

  useNotificationManager(state.message, state.isSuccess, !isPending)
  useFetchingIndicatorManager(isPending)

  const handlePasteClick = async () => {
    const data = await paste()
    if (!data.clipText) {
      showToast(data.error ?? 'Unknown error during paste text')
      return
    }
    setUrl(data.clipText)
  }

  const t = useTranslations('LoadMetaForm')
  const tErrors = useTranslations('errors')

  return (
    <form className='grid gap-[30px]' action={formAction}>
      <fieldset disabled={isPending}>
        <Field data-invalid={Boolean(state.errors)}>
          <FieldLabel>{t('fields.url.label')}</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupButton
                aria-label={t('buttons.paste.ariaLabel')}
                onClick={handlePasteClick}
              >
                <ClipboardPaste /> {t('buttons.paste.title')}
              </InputGroupButton>
            </InputGroupAddon>

            <InputGroupInput
              autoFocus
              placeholder={t('fields.url.placeholder')}
              name={LOAD_META_FORMDATA.URL}
              aria-invalid={Boolean(state.errors)}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <InputGroupAddon align='inline-end'>
              <InputGroupButton
                aria-label={t('buttons.load.ariaLabel')}
                type='submit'
                disabled={isPending}
              >
                {t('buttons.load.title')}
                <CloudDownload data-icon='inline-end' />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <FieldError
            errors={state.errors?.url?.map((code) => ({
              message: tErrors(code),
            }))}
          />
        </Field>
      </fieldset>
    </form>
  )
}
