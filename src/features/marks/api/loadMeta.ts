'use server'

import { getMQLMeta } from './getMQLMeta'

export async function loadMeta(
  prevState: LoadMetaFormState,
  formData: FormData,
) {
  const { url } = Object.fromEntries(formData)

  const cleanUrl = url.toString().trim()
  if (!cleanUrl) {
    return { data: null, error: 'Do not provide empty URL' }
  }

  const { data, error } = await getMQLMeta(cleanUrl)

  if (!data) return { data: null, error }

  return {
    data: {
      title: data.title ?? '',
      url: data.url ?? '',
      description: data.description ?? '',
      logoUrl: data.logo?.url ?? '',
    },
    error: null,
  }
}
