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
      metadata: null,
      error: 'To get Metadata by url you must login to account',
    }

  // zod validation
  const { validatedData, validationErrors } = validateFormData(
    formData,
    LoadMetaFormSchema,
  )
  if (!validatedData)
    return {
      metadata: null,
      error: validationErrors.url?.[0] ?? 'Unknown error',
    }

  // get metadata with api
  const { metadata, error } = await getMetadata(validatedData.url)
  if (!metadata) return { metadata: null, error }

  // check at least one field existence
  const { url, title, description, favicon } = metadata
  if (!url && !title && !description && !favicon)
    return {
      metadata: null,
      error: `Failed to fetch URL: ${validatedData.url}`,
    }

  // return success
  return {
    metadata: {
      title,
      url,
      description,
      logoUrl: favicon,
    },
    error: null,
  }
}
