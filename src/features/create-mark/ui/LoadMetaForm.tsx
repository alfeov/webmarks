'use client'

import { useEffect } from 'react'

import { showErrorToast } from '@/shared/lib/utils/showErrorToast'
import { Field, FieldError, FieldLabel } from '@/shared/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/shared/ui/input-group'

import { LOAD_META_FORMDATA } from '../lib/constants'
import { useMetaContext } from '../model/MetaContext'

import { ClipboardPaste, CloudDownload } from 'lucide-react'

export function LoadMetaForm() {
  const {
    state: { error },
    formAction,
    isPending,
  } = useMetaContext()

  useEffect(() => {
    if (error) {
      showErrorToast(error)
    }
  }, [error])

  return (
    <form className='grid gap-[30px]' action={formAction}>
      <fieldset disabled={isPending}>
        <Field data-invalid={Boolean(error)}>
          <FieldLabel>Insert url and autoload data</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupButton aria-label='search mark'>
                <ClipboardPaste /> Paste
              </InputGroupButton>
            </InputGroupAddon>

            <InputGroupInput
              placeholder='Search Meta by URL...'
              name={LOAD_META_FORMDATA.URL}
              aria-invalid={Boolean(error)}
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
          {error && <FieldError>{error}</FieldError>}
        </Field>
      </fieldset>
    </form>
  )
}
