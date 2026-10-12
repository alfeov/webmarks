import { prisma } from '@/shared/lib/prisma'

if (!process.env.DATABASE_URL?.includes('test')) {
  throw new Error('Refusing to prevent clean non-test database')
}

beforeEach(async () => {
  const deleteUsers = prisma.user.deleteMany()
  const deleteTags = prisma.tag.deleteMany()
  const deleteWebMarks = prisma.webMark.deleteMany()
  await prisma.$transaction([deleteUsers, deleteTags, deleteWebMarks])
})
