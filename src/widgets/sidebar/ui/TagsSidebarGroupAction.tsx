'use client'

import { CreateTagForm } from '@/features/create-tag/ui/CreateTagForm'
import { useDialogContext } from '@/shared/lib/contexts/DialogContext'
import { SidebarGroupAction } from '@/shared/ui/sidebar'

import { Plus } from 'lucide-react'

export function TagsSidebarGroupAction() {
  const { openDialog } = useDialogContext()

  return (
    <SidebarGroupAction
      aria-label='open tag dialog'
      onClick={() => openDialog(<CreateTagForm />)}
    >
      <Plus />
    </SidebarGroupAction>
  )
}
