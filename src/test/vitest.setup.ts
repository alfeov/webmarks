import { cleanup } from '@testing-library/react'

import { prisma } from '@/shared/lib/prisma'

import '@testing-library/jest-dom/vitest'

if (!process.env.DATABASE_URL?.includes('test')) {
  throw new Error('Refusing to prevent clean non-test database')
}

export const spyOnConsoleError = vi
  .spyOn(console, 'error')
  .mockImplementation(vi.fn())

beforeEach(async () => {
  const deleteUsers = prisma.user.deleteMany()
  const deleteTags = prisma.tag.deleteMany()
  const deleteWebMarks = prisma.webMark.deleteMany()
  await prisma.$transaction([deleteUsers, deleteTags, deleteWebMarks])
})

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})
