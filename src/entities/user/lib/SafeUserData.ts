import type { User } from '@/shared/lib/prisma/generated/client'

export class SafeUserData implements Pick<User, 'username' | 'avatarUrl'> {
  id: User['id']
  username: User['username']
  avatarUrl: User['avatarUrl']

  constructor({
    id,
    username,
    avatarUrl,
  }: Pick<User, 'id' | 'username' | 'avatarUrl'>) {
    this.id = id
    this.username = username
    this.avatarUrl = avatarUrl
  }
}
