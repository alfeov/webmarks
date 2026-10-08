'use server'

import { MESSAGE_CODES } from '@/shared/api/types'
import { verifySession } from '@/shared/lib/session'
import { validateFormData } from '@/shared/lib/utils/validateFormData'

import { LoadMetaFormSchema } from '../lib/LoadMetaFormSchema'
import type { LoadMetaFormState } from '../model/types'
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
      message: MESSAGE_CODES.UNAUTHORIZED,
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
      message: MESSAGE_CODES.VALIDATION_ERROR,
    }

  // get metadata with api
  const metadata = await getMetadata(validatedData.url)
  if (!metadata)
    return {
      isSuccess: false,
      message: MESSAGE_CODES.LOAD_META_ERROR,
    }

  // check at least one field existence
  const { url, title, description, favicon } = metadata
  if (!url && !title && !description && !favicon)
    return {
      isSuccess: false,
      message: MESSAGE_CODES.LOAD_META_ERROR,
    }

  // return success
  return {
    isSuccess: true,
    message: MESSAGE_CODES.LOAD_META_SUCCESS,
    data: {
      title,
      url,
      description,
      logoUrl: favicon,
    },
  }
}
