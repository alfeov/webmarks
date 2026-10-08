import 'server-only'

import bcrypt from 'bcrypt'

import { SafeUserData } from '@/entities/user/lib/SafeUserData'
import { MESSAGE_CODES } from '@/shared/api/types'
import { prisma } from '@/shared/lib/prisma'
import type { User } from '@/shared/lib/prisma/generated/client'

export async function verifyUser({
  email,
  password,
}: Pick<User, 'email' | 'password'>) {
  // find in db
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  if (!user) return { error: MESSAGE_CODES.USER_NOT_FOUND }

  // compare passwords
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) return { error: MESSAGE_CODES.USER_INCORRECT_PASSWORD }

  return { data: { ...new SafeUserData(user) } }
}
