'use client'

import { useDialogContext } from '@/shared/lib/contexts/DialogContext'
import { Button } from '@/shared/ui/button'

import { CreateMark } from './CreateMark'

import { Plus } from 'lucide-react'

type CreateMarkButtonProps = React.ComponentProps<'button'>

export function CreateMarkButton({ ...props }: CreateMarkButtonProps) {
  const { openDialog } = useDialogContext()

  return (
    <Button {...props} onClick={() => openDialog(<CreateMark />)}>
      New WebMark
      <Plus data-icon='inline-end' />
    </Button>
  )
}
