import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekSummaryFunction } from '../functions/get-week-summary.function'

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/api/summary',
    async () => {
      const { summary } = await getWeekSummaryFunction()
      return {
        data: summary
      }
    }
  )
}