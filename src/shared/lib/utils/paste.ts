import { MESSAGE_CODES } from '@/shared/api/types'

export async function paste() {
  try {
    const clipText = await navigator.clipboard.readText()
    return {
      clipText,
    }
  } catch (error) {
    console.error(error)
    return {
      error: MESSAGE_CODES.PASTE_ERROR,
    }
  }
}
