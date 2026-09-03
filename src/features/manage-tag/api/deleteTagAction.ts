'use server'

import { updateTag } from 'next/cache'
import { redirect } from 'next/navigation'

import { verifySession } from '@/shared/lib/session'
import { validateFormData } from '@/shared/lib/utils/validateFormData'

import { DeleteTagFormSchema } from '../lib/DeleteTagFormSchema'
import { DeleteTagFormState } from '../model/types'
import { deleteTag } from './deleteTag'

export async function deleteTagAction(
  prevState: DeleteTagFormState,
  formData: FormData,
) {
  // check auth
  const session = await verifySession()
  if (!session)
    return {
      isSuccess: false,
      message: 'To delete you must be auth',
    }

  // zod validation
  const { validationErrors, validatedData } = validateFormData(
    formData,
    DeleteTagFormSchema,
  )
  if (!validatedData)
    return {
      isSuccess: false,
      message:
        validationErrors.id?.[0] ||
        validationErrors.redirect?.[0] ||
        'Unknown validation error, try to input other data',
    }

  // delete tag in db
  const { error } = await deleteTag({
    id: validatedData.id,
  })
  if (error)
    return {
      isSuccess: false,
      message: error,
    }

  // revalidation
  updateTag(`tags-${session.userId}`)
  updateTag(`marks-${session.userId}`)

  // redirection
  if (validatedData.redirect) redirect('/')

  // return success response
  return {
    isSuccess: true,
    message: 'Tag has been successfully deleted!',
  }
}
