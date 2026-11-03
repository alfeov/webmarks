import { prisma } from '@/shared/lib/prisma'

export const clearDatabase = () => {
  if (!process.env.DATABASE_URL?.includes('test')) {
    throw new Error('Refusal to perform cleanup non testing database')
  }

  const deleteUsers = prisma.user.deleteMany()
  const deleteTags = prisma.tag.deleteMany()
  const deleteWebMarks = prisma.webMark.deleteMany()
  return prisma.$transaction([deleteUsers, deleteTags, deleteWebMarks])
}
