import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '../db/schema'
import { env } from '../env'

export const dbClient = postgres(env.DATABASE_URL)
export const db = drizzle(dbClient, { schema, logger: true })
