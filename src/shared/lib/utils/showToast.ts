import { toast } from '@/shared/ui/toast'

// error by default
export function showToast(message: string, isSuccess = false) {
  if (isSuccess) {
    return toast.add({
      type: 'success',
      title: 'Success!',
      description: message,
    })
  }
  return toast.add({
    type: 'error',
    title: 'Something went wrong',
    description: message,
    priority: 'high',
  })
}
