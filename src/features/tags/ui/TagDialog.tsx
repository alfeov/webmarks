import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'
import { SidebarGroupAction } from '@/shared/ui/sidebar'

import { CreateTagForm } from './CreateTagForm'

import { Plus } from 'lucide-react'

export function TagDialog() {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <SidebarGroupAction aria-label='open tag dialog'>
            <Plus />
          </SidebarGroupAction>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new Tag</DialogTitle>
          <DialogDescription>
            Insert data below to create new Tag
          </DialogDescription>
        </DialogHeader>
        <CreateTagForm />
      </DialogContent>
    </Dialog>
  )
}
