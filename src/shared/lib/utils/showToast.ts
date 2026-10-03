import { toast } from '@/shared/ui/toast'

// error by default
export function showToast(title: string, message: string, isSuccess = false) {
  return toast.add({
    type: isSuccess ? 'success' : 'error',
    title: title,
    description: message,
    ...(isSuccess ? {} : { priority: 'high' }),
  })
}
