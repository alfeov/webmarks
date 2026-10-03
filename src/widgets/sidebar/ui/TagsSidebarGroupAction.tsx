'use client'

import { useTranslations } from 'next-intl'

import { CreateTagForm } from '@/features/create-tag/ui/CreateTagForm'
import { useDialogContext } from '@/shared/lib/contexts/DialogContext'
import { SidebarGroupAction } from '@/shared/ui/sidebar'

import { Plus } from 'lucide-react'

export function TagsSidebarGroupAction() {
  const { openDialog } = useDialogContext()

  const t = useTranslations('TagsSidebarGroupAction')

  return (
    <SidebarGroupAction
      aria-label={t('ariaLabel')}
      onClick={() => openDialog(<CreateTagForm />)}
    >
      <Plus />
    </SidebarGroupAction>
  )
}
