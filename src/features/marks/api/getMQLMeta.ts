import mql, { MicrolinkError } from '@microlink/mql'

export async function getMQLMeta(url: string) {
  try {
    const { data } = await mql(url, {
      meta: true,
    })

    return {
      data,
      error: null,
    }
  } catch (error) {
    console.error(error)
    const result = {
      data: null,
      error: 'Unknown internal error',
    }
    if (error instanceof MicrolinkError) {
      result.error = error.data?.url ?? 'Unknown internal error'
    }
    return result
  }
}
