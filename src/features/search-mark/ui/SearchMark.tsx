import Form from 'next/form'
import { useTranslations } from 'next-intl'

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
        <InputGroupInput name='query' placeholder={t('placeholder')} />
        <InputGroupAddon align='inline-end'>
          <SearchButton />
        </InputGroupAddon>
      </InputGroup>
    </Form>
  )
}
