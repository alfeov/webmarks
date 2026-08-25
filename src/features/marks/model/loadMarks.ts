import { verifySession } from '@/features/auth/model/session'
import { prisma } from '@/shared/lib/prisma'

export async function loadMarks() {
  const session = await verifySession()

  if (!session) return { message: 'To view marks you must be auth' }

  const marks = await prisma.webMark.findMany({
    where: {
      userId: session.userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  if (marks.length === 0) return { message: 'There are no WebMarks yet' }
}
