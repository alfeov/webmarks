'use client'

import { CloseDialogButton } from '@/shared/ui/CloseDialogButton'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'

import { MarkTagsForm } from './MarkTagsForm'

type MarkTagsDialogProps = {
  isOpen: boolean
  closeDialog: () => void
}

export function MarkTagsDialog({ isOpen, closeDialog }: MarkTagsDialogProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>WebMark Tags</DialogTitle>
          <DialogDescription>Select Tags to WebMark</DialogDescription>
        </DialogHeader>
        <MarkTagsForm />
        <CloseDialogButton onClick={closeDialog} />
      </DialogContent>
    </Dialog>
  )
}
