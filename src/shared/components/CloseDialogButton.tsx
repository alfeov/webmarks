import { Button } from '@/shared/ui/button'

import { cn } from '../lib/utils'

import { X } from 'lucide-react'

type CloseDialogButtonProps = React.ComponentProps<'button'>

export function CloseDialogButton({
  className,
  ...props
}: CloseDialogButtonProps) {
  return (
    <Button
      size='icon-sm'
      variant='outline'
      className={cn(
        'bg-secondary absolute top-4 right-4 border-transparent',
        className,
      )}
      {...props}
    >
      <X />
    </Button>
  )
}
