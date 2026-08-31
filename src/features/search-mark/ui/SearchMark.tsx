'use client'

import Form from 'next/form'
import { usePathname } from 'next/navigation'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/shared/ui/input-group'

import { SearchIcon } from 'lucide-react'

export function SearchMark() {
  const pathname = usePathname()

  return (
    <Form action={pathname ?? '/'}>
      <InputGroup>
        <InputGroupInput placeholder='Search WebMark...' />
        <InputGroupAddon align='inline-end'>
          <InputGroupButton aria-label='search mark' size='icon-xs'>
            <SearchIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Form>
  )
}
