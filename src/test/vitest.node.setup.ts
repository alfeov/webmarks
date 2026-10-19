import { clearDatabase } from './factories/clearDatabase'

if (!process.env.DATABASE_URL?.includes('test')) {
  throw new Error('Refusal to perform cleanup non testing database')
}

vi.mock('next/cache')

beforeEach(async () => {
  await clearDatabase()
})

afterEach(() => {
  vi.clearAllMocks()
})
