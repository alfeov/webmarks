import { Button } from '@/shared/ui/button'

import { Plus } from 'lucide-react'

type CreateMarkButtonProps = React.ComponentProps<'button'>

export function CreateMarkButton({ ...props }: CreateMarkButtonProps) {
  return (
    <Button {...props}>
      New WebMark
      <Plus data-icon='inline-end' />
    </Button>
  )
}
