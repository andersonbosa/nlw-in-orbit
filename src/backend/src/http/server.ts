import fastify from 'fastify'
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { env } from '../env'
import { createGoal } from '../functions/create-goal.function'
import { getWeekPendingGoals } from '../functions/get-week-pending-goals.function'

const app = fastify()
  .withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.post(
  '/api/goals',
  {
    schema: {
      body: z.object({
        title: z.string(),
        desiredWeeklyFrequency: z.number().int().min(1).max(7),
      })
    }
  },
  async (request) => {
    const { body } = request
    await createGoal({
      title: body.title,
      desiredWeeklyFrequency: body.desiredWeeklyFrequency,
    })
  }
)

app.get(
  '/api/pending-goals',
  async () => {
    const { pendingGoals } = await getWeekPendingGoals()
    return {
      pendingGoals
    }
  }
)

app
  .listen({
    port: env.HTTP_PORT,
    host: env.HTTP_HOST,
  })
  .then(liveUrl => {
    console.log(`HTTP Server Running: "${liveUrl}"`)
  })
