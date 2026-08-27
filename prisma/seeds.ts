import bcrypt from 'bcrypt'

import { prisma } from '@/shared/lib/prisma'

const users = [
  {
    email: 'alfeove@gmail.com',
    password: 'Egor12354',
    username: 'alfeov',
    avatarUrl:
      'https://avatars.githubusercontent.com/u/152028606?s=400&u=ebaebc9dc98f243fba28751972fb782cee8f4193&v=4',
  },
]

const saltOrRounds = 10

const seeds = async () => {
  await prisma.user.deleteMany()

  for (const { password, ...userData } of users) {
    const hashedPassword = await bcrypt.hash(password, saltOrRounds)
    const user = await prisma.user.create({
      data: {
        password: hashedPassword,
        ...userData,
      },
    })
  }
}

seeds()
