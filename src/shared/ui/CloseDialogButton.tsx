import { Button } from './button'

import { X } from 'lucide-react'

type CloseDialogButtonProps = React.ComponentProps<'button'>

export function CloseDialogButton({ ...props }: CloseDialogButtonProps) {
  return (
    <Button
      size='icon-sm'
      variant='outline'
      className='absolute top-4 right-4 bg-secondary border-transparent'
      {...props}
    >
      <X />
    </Button>
  )
}
