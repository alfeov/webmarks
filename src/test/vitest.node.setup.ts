import { clearDatabase } from './factories/clearDatabase'

if (!process.env.DATABASE_URL?.includes('test')) {
  throw new Error('Refusing to prevent clean non-test database')
}

vi.mock('next/cache')

beforeEach(async () => {
  await clearDatabase()
})

afterEach(() => {
  vi.clearAllMocks()
})
