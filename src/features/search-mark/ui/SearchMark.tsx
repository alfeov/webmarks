import Form from 'next/form'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/shared/ui/input-group'

import { SearchIcon } from 'lucide-react'

export function SearchMark() {
  return (
    <Form action=''>
      <InputGroup>
        <InputGroupInput name='query' placeholder='Search WebMark...' />
        <InputGroupAddon align='inline-end'>
          <InputGroupButton
            type='submit'
            aria-label='search mark'
            size='icon-xs'
          >
            <SearchIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Form>
  )
}
