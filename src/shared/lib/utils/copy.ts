import { MESSAGE_CODES } from '@/shared/api/types'

export async function copy(value: string) {
  try {
    await navigator.clipboard.writeText(value)
    return {
      isSuccess: true,
      message: MESSAGE_CODES.COPY_SUCCESS,
    }
  } catch (error) {
    console.error(error)
    return {
      isSuccess: false,
      message: MESSAGE_CODES.COPY_ERROR,
    }
  }
}
