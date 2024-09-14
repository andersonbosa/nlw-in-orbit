import z from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoalFunction } from '../functions/create-goal.function'

export const createGoalRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/api/goals/create',
    {
      schema: {
        body: z.object({
          title: z.string(),
          desiredWeeklyFrequency: z.number().int().min(1).max(7),
        }),
      },
    },
    async request => {
      const { body } = request
      const { goal } = await createGoalFunction({
        title: body.title,
        desiredWeeklyFrequency: body.desiredWeeklyFrequency,
      })
      return {
        data: goal,
      }
    }
  )
}