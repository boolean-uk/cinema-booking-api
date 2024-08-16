// You don't need to touch this file, this is just exporting prisma so you can use it
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
dotenv.config()

let prisma: PrismaClient

prisma = new PrismaClient({
    log: ['query'],
})

if (process.env.NODE_ENV === 'test') {
    prisma = new PrismaClient({})
    // Connect to the user's test database instance
    process.env['DATABASE_URL'] = process.env['TEST_DATABASE_URL']
    console.log(`Connected to DB instance: ${process.env['DATABASE_URL']}`)
}

export default prisma
