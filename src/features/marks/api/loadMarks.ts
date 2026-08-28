import { prisma } from '@/shared/lib/prisma'
import { verifySession } from '@/shared/lib/session'

export async function loadMarks() {
  const session = await verifySession()
  if (!session) return { marks: [], message: 'To view marks you must be auth' }

  const marks = await prisma.webMark.findMany({
    where: {
      userId: session.userId,
    },
    orderBy: [
      {
        pinned: 'desc',
      },
      {
        createdAt: 'desc',
      },
    ],
    include: {
      tags: true,
    },
  })

  if (marks.length === 0)
    return { marks: [], message: 'There are no WebMarks yet' }

  return { marks, message: null }
}
