import bcrypt from 'bcrypt'

import { prisma } from '@/shared/lib/prisma'
import type {
  TagCreateInput,
  UserCreateInput,
  WebMarkCreateInput,
} from '@/shared/lib/prisma/generated/models'

const users: UserCreateInput[] = [
  {
    id: '1',
    email: 'alfeove@gmail.com',
    password: 'Egor12354',
    username: 'alfeov',
    avatarUrl:
      'https://avatars.githubusercontent.com/u/152028606?s=400&u=ebaebc9dc98f243fba28751972fb782cee8f4193&v=4',
  },
]

const webMarks: WebMarkCreateInput[] = [
  {
    id: '1',
    user: {
      connect: {
        id: '1',
      },
    },
    url: 'https://www.perplexity.ai',
    title: 'Perplexity',
    description:
      'Perplexity is a free AI-powered answer engine that provides accurate, trusted, and real-time answers to any question.',
    logoUrl:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAQlBMVEUAAAAAAAAAAAAAAABXV1Z8fHu8vLn///+kpKLGxsTS0tAnJybq6ufx8e5NTUxgYF/9/fqJiYdAQD+ZmZgUFBOsrKu6bN1AAAAABHRSTlMOxv/HUEpROgAAAOpJREFUeAF80UeWwyAQBFAlKDIIxve/6tCyyc/uBekvOrBt+/Elzm07j6+xb8eP+ODFno3zZ2PXiBC0SUmrwIxQBRUW1MZqQm2NXjAnhOPcIaed0CEvPhgT/JHRdWiNhbV5DSEv1iKvFSFuCmYAw56jQMGSQ1qlrKo1FPS0GkPVmhAp/YgR6t2nApvRg5chcPABr4jUxpdw9TldxNHwQHQdGoO/vEdrY7lXTOlF6BECPOErpX58GRkE5wKM0syzTbgp5420Dp7DH4TU1IJwpVq3fHbQrRUd/IBR933qOOD/sANQgicnyTMyAADQnw6RUqiyHQAAAABJRU5ErkJggg==',
  },
]

const tags: TagCreateInput[] = [
  {
    title: 'AI',
    user: {
      connect: {
        id: '1',
      },
    },
    webmarks: {
      connect: {
        id: '1',
      },
    },
  },
]

const saltOrRounds = 10

export const seeds = async () => {
  const deleteUsers = prisma.user.deleteMany()
  const deleteTags = prisma.tag.deleteMany()
  const deleteWebMarks = prisma.webMark.deleteMany()
  await prisma.$transaction([deleteUsers, deleteTags, deleteWebMarks])

  for (const { password, ...userData } of users) {
    const hashedPassword = await bcrypt.hash(password, saltOrRounds)
    await prisma.user.create({
      data: {
        password: hashedPassword,
        ...userData,
      },
    })
  }
  console.log('✨ users successfully created!')

  for (const webMark of webMarks) {
    await prisma.webMark.create({
      data: webMark,
    })
  }
  console.log('✨ webMarks successfully created!')

  for (const tag of tags) {
    await prisma.tag.create({
      data: tag,
    })
  }
  console.log('✨ tags successfully created!')
}

seeds()
