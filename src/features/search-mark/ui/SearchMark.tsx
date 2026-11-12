import Form from 'next/form'
import { useTranslations } from 'next-intl'

import { SEARCH_MARK_FORM } from '@/features/search-mark/lib/constants'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/shared/ui/input-group'

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
