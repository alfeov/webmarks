'use server'

import { verifySession } from '@/shared/lib/session'
import { validateFormData } from '@/shared/lib/utils/validateFormData'

import { LoadMetaFormSchema } from '../lib/LoadMetaFormSchema'
import { LoadMetaFormState } from '../model/types'
import { getMetadata } from './getMetadata'

export async function loadMetaAction(
  prevState: LoadMetaFormState,
  formData: FormData,
): Promise<LoadMetaFormState> {
  // check auth
  const session = await verifySession()
  if (!session)
    return {
      isSuccess: false,
      message: 'UNAUTHORIZED',
    }

  // zod validation
  const { validatedData, validationErrors } = validateFormData(
    formData,
    LoadMetaFormSchema,
  )
  if (!validatedData)
    return {
      isSuccess: false,
      errors: validationErrors,
      message: 'VALIDATION_ERROR',
    }

  // get metadata with api
  const metadata = await getMetadata(validatedData.url)
  if (!metadata)
    return {
      isSuccess: false,
      message: 'LOAD_META_ERROR',
    }

  // check at least one field existence
  const { url, title, description, favicon } = metadata
  if (!url && !title && !description && !favicon)
    return {
      isSuccess: false,
      message: 'LOAD_META_ERROR',
    }

  // return success
  return {
    isSuccess: true,
    message: 'LOAD_META_SUCCESS',
    data: {
      title,
      url,
      description,
      logoUrl: favicon,
    },
  }
}
