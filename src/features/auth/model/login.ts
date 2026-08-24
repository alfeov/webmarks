'use server'

import bcrypt from 'bcrypt'
import { flattenError } from 'zod'

import { prisma } from '@/shared/lib/prisma'

import { LOGIN_FORMDATA } from './constants'
import { LoginFormSchema } from './LoginFormSchema'

type FormState =
  | {
      isSuccess?: boolean
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export async function login(prevState: FormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get(LOGIN_FORMDATA.EMAIL),
    password: formData.get(LOGIN_FORMDATA.PASSWORD),
  })

  if (!validatedFields.success) {
    return {
      errors: flattenError(validatedFields.error).fieldErrors,
    }
  }

  const { email, password } = validatedFields.data

  const data = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!data)
    return {
      message: "User with this email doesn't exist",
    }

  const isPasswordMatch = await bcrypt.compare(password, data.password)
  if (!isPasswordMatch)
    return {
      message: 'Incorrect password!',
    }

  return {
    isSuccess: true,
    message:
      'You have successfully enter to your account: ' +
      (data.username ?? data.email),
  }
}
