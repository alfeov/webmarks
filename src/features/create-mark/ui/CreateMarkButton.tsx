'use client'

import { useTranslations } from 'next-intl'

import { useDialogContext } from '@/shared/lib/contexts/DialogContext'
import { Button } from '@/shared/ui/button'

import { CreateMark } from './CreateMark'

import { Plus } from 'lucide-react'

type CreateMarkButtonProps = React.ComponentProps<'button'>

export function CreateMarkButton({ ...props }: CreateMarkButtonProps) {
  const { openDialog } = useDialogContext()

  const t = useTranslations('createMarkButton')

  return (
    <Button {...props} onClick={() => openDialog(<CreateMark />)}>
      {t('title')}
      <Plus data-icon='inline-end' />
    </Button>
  )
}
