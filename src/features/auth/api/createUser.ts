import 'server-only'

import bcrypt from 'bcrypt'

import { prisma } from '@/shared/lib/prisma'
import { Prisma } from '@/shared/lib/prisma/generated/client'
import { UserCreateInput } from '@/shared/lib/prisma/generated/models'

const saltOrRounds = 10

export async function createUser({ password, ...userData }: UserCreateInput) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltOrRounds)
    const user = await prisma.user.create({
      data: {
        password: hashedPassword,
        ...userData,
      },
    })
    return { user, error: null }
  } catch (error) {
    // handle errors
    console.error(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002')
        return { user: null, error: 'User with this email already exist' }
    }
    return {
      user: null,
      error: 'An internal error occurred while creating your account',
    }
  }
}
