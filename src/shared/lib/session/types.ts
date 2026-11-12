import type { User } from '@/shared/lib/prisma/generated/client'

export type SessionPayload = {
  userId: User['id']
} & Pick<User, 'avatarUrl' | 'username'>
