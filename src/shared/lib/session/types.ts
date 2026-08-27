import { User } from '../prisma/generated/client'

export type SessionPayload = {
  userId: User['id']
} & Pick<User, 'avatarUrl' | 'username'>
