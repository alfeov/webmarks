import 'server-only'

import { prisma } from '@/shared/lib/prisma'
import { verifySession } from '@/shared/lib/session'

interface LoadMarksParams {
  tagTitle?: string
}

export async function loadMarks({ tagTitle }: LoadMarksParams) {
  const session = await verifySession()
  if (!session) return { marks: [], message: 'To view marks you must be auth' }

  const marks = await prisma.webMark.findMany({
    where: {
      userId: session.userId,
      tags: {
        some: {
          title: tagTitle,
        },
      },
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
