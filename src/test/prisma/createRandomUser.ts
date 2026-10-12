import { randomUUID } from 'crypto'

import { prisma } from '@/shared/lib/prisma'

export const createRandomUser = async () => {
  const randomId = randomUUID()

  return prisma.user.create({
    data: {
      password: randomId,
      email: `${randomId}@gmail.com`,
      username: `username-${randomId}`,
    },
  })
}
