import { toast } from '../ui/toast'

export function showErrorToast(message: string) {
  toast.add({
    type: 'error',
    title: 'Something went wrong',
    description: message,
    priority: 'high',
  })
}
