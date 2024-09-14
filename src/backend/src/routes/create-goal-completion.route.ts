import z from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoalCompletionFunction } from '../functions/create-goal-completion.function'

export const createGoalCompletionRoute: FastifyPluginAsyncZod = async (app) => {

  app.post(
    '/api/goals/get-completions',
    {
      schema: {
        body: z.object({
          goalId: z.string(),
        }),
      },
    },
    async request => {
      const { goalId } = request.body
      const { goalCompletion } = await createGoalCompletionFunction({ goalId })
      return {
        data: goalCompletion,
      }
    }
  )
}