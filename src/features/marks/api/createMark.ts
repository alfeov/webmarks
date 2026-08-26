'use server'

import { flattenError } from 'zod'

import { verifySession } from '@/features/auth/model/session'
import { prisma } from '@/shared/lib/prisma'
import { Prisma } from '@/shared/lib/prisma/generated/client'

import { MarkFormSchema } from '../model/MarkFormSchema'

type FormState = {
  isSuccess: boolean
  errors: {
    title?: string[]
    url?: string[]
    description?: string[]
    logoUrl?: string[]
  } | null
  message: string | null
}

export const initialState: FormState = {
  isSuccess: true,
  errors: null,
  message: null,
}

export async function createMark(prevState: FormState, data: CreateMark) {
  const validatedFields = MarkFormSchema.safeParse(data)

  if (!validatedFields.success)
    return {
      isSuccess: false,
      errors: flattenError(validatedFields.error).fieldErrors,
      message: 'Please fix the highlighted fields',
    }

  const session = await verifySession()
  if (!session)
    return {
      isSuccess: false,
      errors: null,
      message: 'To create WebMarks you must login to account',
    }

  try {
    const { title, description, url, logoUrl } = validatedFields.data
    await prisma.webMark.create({
      data: {
        userId: session.userId,
        title,
        url,
        description,
        logoUrl: logoUrl ?? null,
      },
    })

    return {
      isSuccess: true,
      errors: null,
      message: 'Webmark has been successfully created',
    }
  } catch (error) {
    console.error(error)
    const result = {
      isSuccess: false,
      errors: null,
      message: 'An internal error occurred while creating WebMark',
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        result.message = 'WebMark with this URL already exist!'
      }
    }
    return result
  }
}
