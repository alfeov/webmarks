import 'server-only'

import { cacheLife, cacheTag } from 'next/cache'

import { prisma } from '@/shared/lib/prisma'
import type { User } from '@/shared/lib/prisma/generated/client'

import { SafeUserData } from '../lib/SafeUserData'

interface GetUserDataProps {
  id?: User['id']
}

export async function getUserData({ id }: GetUserDataProps) {
  'use cache'

  cacheTag(`user-${id}`)
  cacheLife('days')

  if (!id) return null

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (!user) return null

  return { ...new SafeUserData(user) }
}
