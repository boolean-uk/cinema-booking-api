// You don't need to touch this file, this is just exporting prisma so you can use it
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
dotenv.config()

let prisma: PrismaClient

if (process.env.NODE_ENV === 'test') {
    prisma = new PrismaClient({
        log: ['query'],
    })
    // Connect to the user's test database instance
    process.env['DATABASE_URL'] = process.env['TEST_DATABASE_URL']
    console.log(`Connected to DB instance: ${process.env['DATABASE_URL']}`)
}

prisma = new PrismaClient()

export default prisma
