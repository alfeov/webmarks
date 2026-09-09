'use server'

import { verifySession } from '@/shared/lib/session'
import { validateFormData } from '@/shared/lib/utils/validateFormData'

import { LoadMetaFormSchema } from '../lib/LoadMetaFormSchema'
import { LoadMetaFormState } from '../model/types'
import { getMetadata } from './getMetadata'

export async function loadMetaAction(
  prevState: LoadMetaFormState,
  formData: FormData,
) {
  // check auth
  const session = await verifySession()
  if (!session)
    return {
      data: null,
      error: 'To get Metadata by url you must login to account',
    }

  // zod validation
  const { validatedData, validationErrors } = validateFormData(
    formData,
    LoadMetaFormSchema,
  )
  if (!validatedData)
    return {
      data: null,
      error: validationErrors.url?.[0] ?? 'Unknown error',
    }

  // get metadata with api
  const { metadata, error } = await getMetadata(validatedData.url)
  if (!metadata) return { data: null, error }

  // return success
  return {
    data: {
      title: metadata.title ?? '',
      url: metadata.url ?? '',
      description: metadata.description ?? '',
      logoUrl: metadata.favicon ?? '',
    },
    error: null,
  }
}
