import { expect, test } from 'tests/fixtures/auth'
import { fillInputs, submitForm } from 'tests/utils/form'
import { gotoAndWaitForHydration } from 'tests/utils/navigation'
import { expectFetchingIndicatorToBeHidden } from 'tests/utils/tooltip'

import { SEARCH_MARK_FORM } from '@/features/search-mark/lib/constants'
import { TEST_IDS } from '@/shared/config/testids'
import { prisma } from '@/shared/lib/prisma'

const defaultWebmarkData = (id: number) => {
  return {
    title: 'Webmark',
    description: 'Some cool description',
    url: `https://some-url-${id}.com`,
  }
}

test('should search mark by title, description or url insensitive', async ({
  authorizedPage,
  user,
}) => {
  await prisma.webMark.createMany({
    data: [
      {
        userId: user.id,
        ...defaultWebmarkData(1),
        title: 'Keyword',
      },
      {
        userId: user.id,
        ...defaultWebmarkData(2),
        description: 'KEYWORD',
      },
      {
        userId: user.id,
        ...defaultWebmarkData(3),
        url: 'https://keyword.com',
      },
      {
        userId: user.id,
        ...defaultWebmarkData(4),
      },
    ],
  })

  await gotoAndWaitForHydration(authorizedPage)

  await test.step('mark list has corresponding items length', () =>
    expect(
      authorizedPage
        .getByTestId(TEST_IDS.STATIC.MARK_LIST)
        .getByRole('listitem'),
    ).toHaveCount(4))

  await fillInputs({
    page: authorizedPage,
    fields: {
      [SEARCH_MARK_FORM.QUERY]: 'keyword',
    },
  })

  await submitForm({
    page: authorizedPage,
    submitButton: authorizedPage.getByTestId(
      TEST_IDS.CLICKABLE.BUTTON.SEARCH_MARK,
    ),
  })

  await expectFetchingIndicatorToBeHidden(authorizedPage)

  await test.step('mark list has searched items', async () => {
    const cards = authorizedPage
      .getByTestId(TEST_IDS.STATIC.MARK_LIST)
      .getByRole('listitem')
    await expect(cards).toHaveCount(3)
    await expect(cards).toContainText(['Keyword', 'KEYWORD', 'keyword'])
  })
})

test('should search mark with tag on corresponding page', async ({
  authorizedPage,
  user,
  tag,
}) => {
  const webmark1 = prisma.webMark.create({
    data: {
      userId: user.id,
      ...defaultWebmarkData(1),
      title: 'KEYWORD',
      tags: {
        connect: {
          id: tag.id,
        },
      },
    },
  })
  const webmark2 = prisma.webMark.create({
    data: {
      userId: user.id,
      ...defaultWebmarkData(2),
      tags: {
        connect: {
          id: tag.id,
        },
      },
    },
  })
  const webmark3 = prisma.webMark.create({
    data: {
      userId: user.id,
      ...defaultWebmarkData(3),
    },
  })

  await Promise.all([webmark1, webmark2, webmark3])

  await gotoAndWaitForHydration(authorizedPage, `/${tag.id}`)

  await test.step('mark list has corresponding items length', () =>
    expect(
      authorizedPage
        .getByTestId(TEST_IDS.STATIC.MARK_LIST)
        .getByRole('listitem'),
    ).toHaveCount(2))

  await fillInputs({
    page: authorizedPage,
    fields: {
      [SEARCH_MARK_FORM.QUERY]: 'keyword',
    },
  })

  await submitForm({
    page: authorizedPage,
    submitButton: authorizedPage.getByTestId(
      TEST_IDS.CLICKABLE.BUTTON.SEARCH_MARK,
    ),
  })

  await expectFetchingIndicatorToBeHidden(authorizedPage)

  await test.step('mark list has searched items', async () => {
    const cards = authorizedPage
      .getByTestId(TEST_IDS.STATIC.MARK_LIST)
      .getByRole('listitem')
    await expect(cards).toHaveCount(1)
    await expect(cards).toContainText(['KEYWORD'])
  })
})
