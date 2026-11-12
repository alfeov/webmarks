import { expect, test } from 'tests/fixtures/auth'
import { gotoAndWaitForHydration } from 'tests/utils/navigation'

import { TEST_IDS } from '@/shared/config/testids'
import { prisma } from '@/shared/lib/prisma'

test('MarkItem has corresponding design', async ({
  authorizedPage,
  user,
  tag: _tag,
  webmark,
}) => {
  await prisma.tag.createMany({
    data: [
      {
        title: 'Tag Title',
        userId: user.id,
      },
      {
        title: 'Another Tag',
        userId: user.id,
      },
      {
        title: 'And Another Tag',
        userId: user.id,
      },
    ],
  })

  const tags = await prisma.tag.findMany({
    where: {
      userId: user.id,
    },
  })
  const tagIds = tags.map((tag) => ({ id: tag.id }))

  await prisma.webMark.update({
    data: {
      tags: {
        set: tagIds,
      },
      pinned: true,
    },
    where: {
      id: webmark.id,
    },
  })

  await gotoAndWaitForHydration(authorizedPage)

  const markItem = authorizedPage.getByTestId(
    TEST_IDS.STATIC.MARK_ITEM(webmark.id),
  )

  await expect(markItem).toBeVisible()
  await expect(markItem).toHaveScreenshot()
})
