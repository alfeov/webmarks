import mql, { MicrolinkError } from '@microlink/mql'

export interface FormState {
  error: string | null
  data: CreateMark | null
}

export const initialState: FormState = {
  error: null,
  data: {
    title: '',
    url: '',
    description: '',
    logoUrl: '',
  },
}

export async function loadMeta(prevState: FormState, formData: FormData) {
  const { url } = Object.fromEntries(formData)

  const cleanUrl = url.toString().trim()
  if (!cleanUrl) {
    return { data: null, error: 'Do not provide empty URL' }
  }

  try {
    const { data } = await mql(cleanUrl, {
      meta: true,
    })

    return {
      data: {
        title: data.title ?? '',
        url: data.url ?? '',
        description: data.description ?? '',
        logoUrl: data.logo?.url ?? '',
      },
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
