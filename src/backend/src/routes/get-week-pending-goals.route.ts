import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekPendingGoalsFunction } from '../functions/get-week-pending-goals.function'

export const getWeekPendingGoalsRoute: FastifyPluginAsyncZod = async (app) => {
  app.get('/api/goals/get-pendings', async () => {
    const { pendingGoals } = await getWeekPendingGoalsFunction()
    return {
      data: pendingGoals,
    }
  })

}