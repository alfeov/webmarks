'use server'

import bcrypt from 'bcrypt'
import { flattenError } from 'zod'

import { prisma } from '@/shared/lib/prisma'
import { Prisma } from '@/shared/lib/prisma/generated/client'

import { SIGNUP_FORMDATA } from './constants'
import { createSession } from './session'
import { SignupFormSchema } from './SignupFormSchema'

type FormState =
  | {
      isSuccess?: boolean
      errors?: {
        username?: string[]
        email?: string[]
        password?: string[]
        confirmPassword?: string[]
      }
      message?: string
    }
  | undefined

export async function signup(prevState: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get(SIGNUP_FORMDATA.USERNAME),
    email: formData.get(SIGNUP_FORMDATA.EMAIL),
    password: formData.get(SIGNUP_FORMDATA.PASSWORD),
    confirmPassword: formData.get(SIGNUP_FORMDATA.CONFIRM_PASSWORD),
  })

  if (!validatedFields.success) {
    return {
      errors: flattenError(validatedFields.error).fieldErrors,
    }
  }

  try {
    const { username, email, password } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    const data = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    })

    await createSession({
      avatarUrl: data.avatarUrl,
      userId: data.id,
      username: data.username,
    })

    return {
      isSuccess: true,
      message:
        'You have successfully create account: ' +
        (data.username ?? data.email),
    }
  } catch (error) {
    console.error(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002')
        return {
          message: 'User with this email already exist',
        }
      return {
        message: 'An error occurred while creating your account',
      }
    }
    return { message: 'Unknown internal error' }
  }
}
