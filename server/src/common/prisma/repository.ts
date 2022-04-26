import { PrismaClient } from '@prisma/client'

let repository: PrismaClient

declare global {
  var repository: PrismaClient | undefined
}

if (process.env.NODE_ENV === 'production') {
  repository = new PrismaClient()

  repository.$connect()
} else {
  if (!global.repository) {
    global.repository = new PrismaClient()
    global.repository.$connect()
  }

  repository = global.repository
}

export default repository
