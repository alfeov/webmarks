import 'server-only'

import bcrypt from 'bcrypt'

import { prisma } from '@/shared/lib/prisma'
import { User } from '@/shared/lib/prisma/generated/client'

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
  if (!user) return { user: null, error: "User with this email doesn't exist" }

  // compare passwords
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) return { user: null, error: 'Incorrect password!' }

  return { user, error: null }
}
