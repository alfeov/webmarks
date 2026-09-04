'use server'

import { updateTag } from 'next/cache'

import { Tag } from '@/shared/lib/prisma/generated/client'
import { verifySession } from '@/shared/lib/session'
import { createResult } from '@/shared/lib/utils/createResult'
import { validateFormData } from '@/shared/lib/utils/validateFormData'

import { EditTagFormSchema } from '../lib/EditTagFormSchema'
import type { EditTagFormState } from '../model/types'
import { updateUserTag } from './updateUserTag'

export async function editTagAction(
  id: Tag['id'],
  prevState: EditTagFormState,
  formData: FormData,
) {
  // check auth
  const session = await verifySession()
  if (!session)
    return createResult({
      message: 'To edit tags you must be auth',
    })

  // zod validation
  const { validatedData, validationErrors } = validateFormData(
    formData,
    EditTagFormSchema,
  )
  if (!validatedData)
    return createResult({
      message: 'Please fix highlighted fields',
      errors: validationErrors,
    })

  // update tag in DB
  const {} = updateUserTag({
    id,
    newTitle: validatedData.title,
    userId: session.userId,
  })

  // revalidation
  updateTag(`tags-${session.userId}`)
  updateTag(`marks-${session.userId}`)

  // return success response
  return createResult({
    isSuccess: true,
    message: 'Tag has been successfully edited',
  })
}
