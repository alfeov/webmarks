import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'

import { CreateMarkButton } from './CreateMarkButton'
import { CreateMarkForm } from './CreateMarkForm'

export function CreateMark() {
  return (
    <Dialog>
      <DialogTrigger render={<CreateMarkButton data-slot='dialog-trigger' />} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new WebMark</DialogTitle>
          <DialogDescription>
            Insert url below to create new WebMark
          </DialogDescription>
        </DialogHeader>
        <CreateMarkForm />
      </DialogContent>
    </Dialog>
  )
}
