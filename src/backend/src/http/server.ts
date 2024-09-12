import fastify from 'fastify'
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { env } from '../env'
import { createGoal } from '../functions/create-goal.function'
import { getWeekPendingGoals } from '../functions/get-week-pending-goals.function'
import { createGoalCompletion } from '../functions/create-goal-completion.function'

const app = fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.get('/api/healthcheck', async () => {
  return {
    live: true,
    when: new Date().toISOString(),
  }
})

app.post(
  '/api/goals/create',
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
    const { goal } = await createGoal({
      title: body.title,
      desiredWeeklyFrequency: body.desiredWeeklyFrequency,
    })
    return {
      data: goal
    }
  }
)

app.get(
  '/api/goals/get-pendings',
  async () => {
    const { pendingGoals } = await getWeekPendingGoals()
    return {
      data: pendingGoals
    }
  }
)

app.post(
  '/api/goals/get-completions',
  {
    schema: {
      body: z.object({
        goalId: z.string()
      })
    }
  },
  async (request) => {
    const { goalId } = request.body
    const { goalCompletion } = await createGoalCompletion({ goalId })
    return {
      data: goalCompletion
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
