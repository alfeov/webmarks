'use client'

import { useActionState, useEffect } from 'react'

import { Button } from '@/shared/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/shared/ui/input-group'
import { showErrorToast } from '@/shared/utils/showErrorToast'

import { createWebMark } from '../model/createWebMark'

import { ClipboardPaste } from 'lucide-react'

const initialState = {
  error: '',
}

export function CreateMarkForm() {
  const [state, formAction, isPending] = useActionState(
    createWebMark,
    initialState,
  )

  useEffect(() => {
    if (state?.error) {
      showErrorToast(state.error)
    }
  }, [state?.error])

  return (
    <form id='createMarkForm' action={formAction} className='grid gap-[30px]'>
      <InputGroup>
        <InputGroupInput
          placeholder='Search WebMark...'
          name='url'
          aria-invalid={Boolean(state?.error)}
        />
        <InputGroupAddon align='inline-end'>
          <InputGroupButton aria-label='search mark' size='icon-xs'>
            <ClipboardPaste />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <Button type='submit' form='createMarkForm' disabled={isPending}>
        {isPending ? 'Creating...' : 'Create WebMark'}
      </Button>
    </form>
  )
}
