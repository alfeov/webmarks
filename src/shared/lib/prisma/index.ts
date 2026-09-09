import { PrismaPg } from '@prisma/adapter-pg'

import { PrismaClient } from './generated/client'

import 'dotenv/config'

const connectionString = `${process.env.DATABASE_URL}`

if (!connectionString)
  throw new Error('DATABASE_URL is missing, check .env file on correct data')

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export { prisma }
