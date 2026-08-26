'use client'

import { use, useEffect } from 'react'

import { Field, FieldError, FieldLabel } from '@/shared/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/shared/ui/input-group'
import { showErrorToast } from '@/shared/utils/showErrorToast'

import { MetaContext } from '../model/MetaContext'

import { ClipboardPaste, CloudDownload } from 'lucide-react'

export function LoadMetaForm() {
  const metaContext = use(MetaContext)
  if (!metaContext)
    throw new Error('Component must be wrapped in ContextProvider')

  const { state, formAction, isPending } = metaContext

  useEffect(() => {
    if (state.error) {
      showErrorToast(state.error)
    }
  }, [state.error])

  return (
    <form className='grid gap-[30px]' action={formAction}>
      <fieldset disabled={isPending}>
        <Field data-invalid={Boolean(state.error)}>
          <FieldLabel>Insert url and autoload data</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupButton aria-label='search mark'>
                <ClipboardPaste /> Paste
              </InputGroupButton>
            </InputGroupAddon>

            <InputGroupInput
              placeholder='Search Meta by URL...'
              name='url'
              aria-invalid={Boolean(state.error)}
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
