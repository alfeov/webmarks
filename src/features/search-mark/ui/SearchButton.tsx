'use client'

import { useTranslations } from 'next-intl'
import { useFormStatus } from 'react-dom'

import { useFetchingIndicatorManager } from '@/shared/lib/hooks/useFetchingIndicatorManager'
import { InputGroupButton } from '@/shared/ui/input-group'

import { SearchIcon } from 'lucide-react'

export function SearchButton() {
  const formStatus = useFormStatus()
  useFetchingIndicatorManager(formStatus.pending)

  const t = useTranslations('SearchButton')

  return (
    <InputGroupButton
      type='submit'
      aria-label={t('ariaLabel')}
      size='icon-xs'
      disabled={formStatus.pending}
    >
      <SearchIcon />
    </InputGroupButton>
  )
}
