import { User } from '@/shared/lib/prisma/generated/client'

export class SafeUserData implements Pick<User, 'username' | 'avatarUrl'> {
  username: User['username']
  avatarUrl: User['avatarUrl']

  constructor({ username, avatarUrl }: Pick<User, 'username' | 'avatarUrl'>) {
    this.username = username
    this.avatarUrl = avatarUrl
  }
}
