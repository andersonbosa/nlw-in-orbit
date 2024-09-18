import { config } from 'dotenv'
config({ path: '.config/env/.env', debug: true })

import z from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  HTTP_PORT: z.coerce.number().default(3000),
  HTTP_HOST: z.string().default('127.0.0.1'),
  HTTP_CORS_POLICY: z.string().default('*'),
  JWT_SECRET: z.string().min(8),
})

export const env = envSchema.parse(process.env)
