'use server'

import mql, { MicrolinkError } from '@microlink/mql'

export async function createWebMark(prevState: unknown, formData: FormData) {
  const webMarkUrl = formData.get('url')?.toString()

  if (webMarkUrl) {
    try {
      const data = await mql(webMarkUrl, {
        meta: true,
      })
      console.log(data.data)
      //todo
    } catch (error) {
      if (error instanceof MicrolinkError) {
        return {
          error: error.data?.url,
        }
      }
    }
  } else {
    return {
      error: 'Field must be not empty',
    }
  }
}
