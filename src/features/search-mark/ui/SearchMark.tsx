import Form from 'next/form'
import { useTranslations } from 'next-intl'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/shared/ui/input-group'

import { SEARCH_MARK_FORM } from '../lib/constants'
import { SearchButton } from './SearchButton'

export function SearchMark() {
  const t = useTranslations('SearchMark')

  return (
    <Form action=''>
      <InputGroup>
        <InputGroupInput
          name={SEARCH_MARK_FORM.QUERY}
          placeholder={t('placeholder')}
          data-testid={`${SEARCH_MARK_FORM.QUERY}-input`}
        />
        <InputGroupAddon align='inline-end'>
          <SearchButton />
        </InputGroupAddon>
      </InputGroup>
    </Form>
  )
}
