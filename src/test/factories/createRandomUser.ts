import { randomUUID } from 'crypto'

import { prisma } from '@/shared/lib/prisma'
import type { UserCreateInput } from '@/shared/lib/prisma/generated/models'

export const createRandomUser = async ({
  password,
  email,
  ...restData
}: Partial<UserCreateInput> = {}) => {
  const randomId = randomUUID()

  return prisma.user.create({
    data: {
      password: password ?? randomId,
      email: email ?? `${randomId}@gmail.com`,
      username: `username-${randomId}`,
      ...restData,
    },
  })
}
