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
      if (error.data?.url?.includes('uses antibot protection')) {
        result.error =
          'This URL uses antibot protection, please insert data in the fields below'
      } else {
        result.error = error.data?.url ?? 'Unknown internal error'
      }
    }
    return result
  }
}
