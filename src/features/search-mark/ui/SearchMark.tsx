import Form from 'next/form'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/shared/ui/input-group'

import { SearchButton } from './SearchButton'

export function SearchMark() {
  return (
    <Form action=''>
      <InputGroup>
        <InputGroupInput name='query' placeholder='Search WebMark...' />
        <InputGroupAddon align='inline-end'>
          <SearchButton />
        </InputGroupAddon>
      </InputGroup>
    </Form>
  )
}
