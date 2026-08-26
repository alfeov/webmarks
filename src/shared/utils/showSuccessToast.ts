import { toast } from '../ui/toast'

export function showSuccessToast(message: string) {
  return toast.add({
    type: 'success',
    title: 'Success!',
    description: message,
  })
}
