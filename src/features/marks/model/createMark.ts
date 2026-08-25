'use server'

import z, { flattenError } from 'zod'

import { verifySession } from '@/features/auth/model/session'
import { prisma } from '@/shared/lib/prisma'
import { Prisma } from '@/shared/lib/prisma/generated/client'

import { MarkFormSchema } from './MarkFormSchema'

type FormState =
  | {
      isSuccess?: boolean
      errors?: {
        title?: string[]
        url?: string[]
        description?: string[]
        logoUrl?: string[]
      }
      message?: string
    }
  | undefined

export async function createMark(prevState: FormState, data: CreateMark) {
  const validatedFields = MarkFormSchema.safeParse(data)

  if (!validatedFields.success)
    return { errors: flattenError(validatedFields.error).fieldErrors }

  const session = await verifySession()
  if (!session)
    return { message: 'To create WebMarks you must login to account' }

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
      message: 'Webmark has been successfully created',
    }
  } catch (error) {
    console.error(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002')
        return {
          message: 'WebMark with this URL already exist!',
        }
      return {
        message: 'An internal error occurred while creating WebMark',
      }
    }
    return { message: 'Unknown internal error' }
  }
}
