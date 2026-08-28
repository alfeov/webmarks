'use server'

import { LOAD_META_FORMDATA } from '../lib/constants'
import { LoadMetaFormState } from '../model/types'
import { getMQLMeta } from './getMQLMeta'

export async function loadMetaAction(
  prevState: LoadMetaFormState,
  formData: FormData,
) {
  const url = formData.get(LOAD_META_FORMDATA.URL)

  const cleanUrl = url?.toString().trim()
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
