import 'server-only'

import { prisma } from '@/shared/lib/prisma'
import { verifySession } from '@/shared/lib/session'

export async function loadTags() {
  const session = await verifySession()
  if (!session) return { tags: [], message: 'To view tags you must be auth' }

  const tags = await prisma.tag.findMany({
    where: {
      userId: session.userId,
    },
    orderBy: {
      title: 'asc',
    },
  })

  if (tags.length === 0) return { tags: [], message: 'There are no Tags yet' }

  return { tags, message: null }
}
