import 'server-only'

import { cacheLife, cacheTag } from 'next/cache'

import { prisma } from '@/shared/lib/prisma'
import { User } from '@/shared/lib/prisma/generated/client'

import { SafeUserData } from '../lib/SafeUserData'

export async function getUserData({
  id,
}: {
  id?: User['id']
}): Promise<
  | { error: null; user: Pick<User, 'username' | 'avatarUrl'> }
  | { error: string; user: null }
> {
  'use cache'

  cacheTag(`user-${id}`)
  cacheLife('days')

  if (!id)
    return {
      error: 'Provided nullish id',
      user: null,
    }

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (!user)
    return {
      error: 'There are no user in db',
      user: null,
    }

  return {
    error: null,
    user: { ...new SafeUserData(user) },
  }
}
