'use client'

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
  error: null,
  metadata: null,
}

export function LoadMetaForm() {
  const [url, setUrl] = useState('')

  const [state, formAction, isPending] = useActionState(
    loadMetaAction,
    initialState,
  )

  const { setMetadata } = useMetaContext()
  useEffect(() => {
    setMetadata(state.metadata)
  }, [state.metadata, setMetadata])

  useNotificationManager(state.error, false, !isPending)
  useFetchingIndicatorManager(isPending)

  const handlePasteClick = async () => {
    const data = await paste()
    if (!data.clipText) {
      showToast(data.error ?? 'Unknown error')
      return
    }
    setUrl(data.clipText)
  }

  return (
    <form className='grid gap-[30px]' action={formAction}>
      <fieldset disabled={isPending}>
        <Field data-invalid={Boolean(state.error)}>
          <FieldLabel>Insert url and autoload data</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupButton
                aria-label='search mark'
                onClick={handlePasteClick}
              >
                <ClipboardPaste /> Paste
              </InputGroupButton>
            </InputGroupAddon>

            <InputGroupInput
              autoFocus
              placeholder='Search Meta by URL...'
              name={LOAD_META_FORMDATA.URL}
              aria-invalid={Boolean(state.error)}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <InputGroupAddon align='inline-end'>
              <InputGroupButton
                aria-label='load metadata from url'
                type='submit'
                disabled={isPending}
              >
                Load
                <CloudDownload data-icon='inline-end' />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          {state.error && <FieldError>{state.error}</FieldError>}
        </Field>
      </fieldset>
    </form>
  )
}
