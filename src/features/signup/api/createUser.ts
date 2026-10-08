import 'server-only'

import bcrypt from 'bcrypt'

import { SafeUserData } from '@/entities/user/lib/SafeUserData'
import { MESSAGE_CODES } from '@/shared/api/types'
import { prisma } from '@/shared/lib/prisma'
import { Prisma } from '@/shared/lib/prisma/generated/client'
import type { UserCreateInput } from '@/shared/lib/prisma/generated/models'
import { saltOrRounds } from '@/shared/lib/session/constants'

export async function createUser({ password, ...userData }: UserCreateInput) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltOrRounds)
    const user = await prisma.user.create({
      data: {
        password: hashedPassword,
        ...userData,
      },
    })
    return { data: { ...new SafeUserData(user) } }
  } catch (error) {
    // handle errors
    console.error(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002')
        return {
          error: MESSAGE_CODES.USER_EXISTS,
        }
    }
    return {
      error: MESSAGE_CODES.INTERNAL_ERROR,
    }
  }
}
