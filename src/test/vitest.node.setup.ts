import { cleanDatabase } from './factories/cleanDatabase'

if (!process.env.DATABASE_URL?.includes('test')) {
  throw new Error('Refusing to prevent clean non-test database')
}

beforeEach(async () => {
  await cleanDatabase()
})
