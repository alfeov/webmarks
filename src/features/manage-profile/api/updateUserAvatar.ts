import 'server-only'

import { SafeUserData } from '@/entities/user/lib/SafeUserData'
import { prisma } from '@/shared/lib/prisma'
import { User } from '@/shared/lib/prisma/generated/client'
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
      user: { ...new SafeUserData(user) },
      error: null,
    }
  } catch (error) {
    // error handling
    console.error(error)
    return {
      user: null,
      error: 'An internal error occurred while updating your account',
    }
  }
}
