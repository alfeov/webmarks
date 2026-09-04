'use client'

import { useFormStatus } from 'react-dom'

import { useFetchingIndicatorManager } from '@/shared/lib/hooks/useFetchingIndicatorManager'
import { InputGroupButton } from '@/shared/ui/input-group'

import { SearchIcon } from 'lucide-react'

export function SearchButton() {
  const formStatus = useFormStatus()
  useFetchingIndicatorManager(formStatus.pending)

  return (
    <InputGroupButton
      type='submit'
      aria-label='search mark'
      size='icon-xs'
      disabled={formStatus.pending}
    >
      <SearchIcon />
    </InputGroupButton>
  )
}
