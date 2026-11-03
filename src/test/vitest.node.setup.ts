import { clearDatabase } from './factories/clearDatabase'

vi.mock('next/cache')

beforeEach(async () => {
  await clearDatabase()
})

afterEach(() => {
  vi.clearAllMocks()
})
