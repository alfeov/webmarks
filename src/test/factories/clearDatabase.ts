import { prisma } from '@/shared/lib/prisma'

export const clearDatabase = () => {
  const deleteUsers = prisma.user.deleteMany()
  const deleteTags = prisma.tag.deleteMany()
  const deleteWebMarks = prisma.webMark.deleteMany()
  return prisma.$transaction([deleteUsers, deleteTags, deleteWebMarks])
}
