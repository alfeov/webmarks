'use client'

import { useEffect, useState } from 'react'

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

import { ClipboardPaste, CloudDownload } from 'lucide-react'

export function LoadMetaForm() {
  const [url, setUrl] = useState('')

  const {
    state: { error },
    formAction,
    isPending,
  } = useMetaContext()

  useEffect(() => {
    if (error) {
      showToast(error)
    }
  }, [error])

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
        <Field data-invalid={Boolean(error)}>
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
              placeholder='Search Meta by URL...'
              name={LOAD_META_FORMDATA.URL}
              aria-invalid={Boolean(error)}
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
          {error && <FieldError>{error}</FieldError>}
        </Field>
      </fieldset>
    </form>
  )
}
