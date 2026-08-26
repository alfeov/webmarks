'use server'

import bcrypt from 'bcrypt'
import { flattenError } from 'zod'

import { prisma } from '@/shared/lib/prisma'

import { LOGIN_FORMDATA } from '../model/constants'
import { LoginFormSchema } from '../model/LoginFormSchema'
import { createSession } from '../model/session'

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

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  if (!user)
    return {
      message: "User with this email doesn't exist",
    }

  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch)
    return {
      message: 'Incorrect password!',
    }

  await createSession({
    avatarUrl: user.avatarUrl,
    userId: user.id,
    username: user.username,
  })

  return {
    isSuccess: true,
    message:
      'You have successfully enter to your account: ' +
      (user.username ?? user.email),
  }
}
