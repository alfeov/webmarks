import Link from 'next/link'

import { DropdownMenuItem } from '@/shared/ui/dropdown-menu'

export function OpenMarkDropdownItem({ url }: { url: string }) {
  return (
    <Link href={url} className='w-full rounded-2xl' target='_blank'>
      <DropdownMenuItem className='w-full'>Open WebMark</DropdownMenuItem>
    </Link>
  )
}
