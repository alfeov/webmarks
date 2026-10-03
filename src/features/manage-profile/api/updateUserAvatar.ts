import 'server-only'

import { SafeUserData } from '@/entities/user/lib/SafeUserData'
import { MESSAGE_CODES } from '@/shared/api/types'
import { prisma } from '@/shared/lib/prisma'
import { Prisma, User } from '@/shared/lib/prisma/generated/client'
import { UserUpdateInput } from '@/shared/lib/prisma/generated/models'

type UpdateUserAvatarParams = {
  id: User['id']
  avatarUrl: UserUpdateInput['avatarUrl']
}

export async function updateUserAvatar({
  id,
  avatarUrl,
}: UpdateUserAvatarParams) {
  try {
    // update user avatar in db
    const user = await prisma.user.update({
      data: {
        avatarUrl,
      },
      where: {
        id,
      },
    })

    // return success
    return {
      data: { ...new SafeUserData(user) },
    }
  } catch (error) {
    // error handling
    console.error(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return { error: MESSAGE_CODES.USER_NOT_FOUND }
      }
    }
    return {
      error: MESSAGE_CODES.INTERNAL_ERROR,
    }
  }
}
