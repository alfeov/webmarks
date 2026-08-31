'use client'

import { CloseDialogButton } from '@/shared/ui/CloseDialogButton'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'

import { useMarkTagsDialogContext } from '../model/MarkTagsDialogContext'
import { MarkTagsForm } from './MarkTagsForm'

export function MarkTagsDialog() {
  const { isDialogOpen, closeDialog } = useMarkTagsDialogContext()

  return (
    <Dialog open={isDialogOpen}>
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
