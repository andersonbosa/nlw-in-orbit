import z from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoalFunction } from '../functions/create-goal.function'
import { authenticateHook } from '../hooks/auth.hook'

export const createGoalRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/api/goals/create',
    {
      preHandler: [authenticateHook],
      schema: {
        body: z.object({
          title: z.string(),
          desiredWeeklyFrequency: z.number().int().min(1).max(7),
        }),
      },
    },
    async request => {
      const { body } = request
      console.log(
        '-----------------------------------------------',
        request.user.id
      )
      const { goal } = await createGoalFunction({
        userId: request.user.id,
        title: body.title,
        desiredWeeklyFrequency: body.desiredWeeklyFrequency,
      })
      return {
        data: goal,
      }
    }
  )
}
