import fastify from 'fastify'
import { env } from '../env'

const app = fastify()

app
  .listen({
    port: env.HTTP_PORT,
    host: env.HTTP_HOST,
  })
  .then(liveUrl => {
    console.log(`HTTP Server Running: "${liveUrl}"`)
  })
