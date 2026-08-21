import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'

import { MetaProvider } from '../model/MetaContext'
import { CreateMarkButton } from './CreateMarkButton'
import { CreateMarkForm } from './CreateMarkForm'
import { LoadMetaForm } from './LoadMetaForm'

export function CreateMark() {
  return (
    <Dialog>
      <DialogTrigger render={<CreateMarkButton data-slot='dialog-trigger' />} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new WebMark</DialogTitle>
          <DialogDescription>
            Insert data below to create new WebMark
          </DialogDescription>
        </DialogHeader>

        <MetaProvider>
          <LoadMetaForm />
          <CreateMarkForm />
        </MetaProvider>
      </DialogContent>
    </Dialog>
  )
}
