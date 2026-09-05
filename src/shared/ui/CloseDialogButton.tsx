import { Button } from './button'

import { X } from 'lucide-react'

type CloseDialogButtonProps = React.ComponentProps<'button'>

export function CloseDialogButton({ ...props }: CloseDialogButtonProps) {
  return (
    <Button
      size='icon-sm'
      variant='outline'
      className='bg-secondary absolute top-4 right-4 border-transparent'
      {...props}
    >
      <X />
    </Button>
  )
}
