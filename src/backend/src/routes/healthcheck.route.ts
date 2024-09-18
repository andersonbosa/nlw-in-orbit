import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const healthcheckRoute: FastifyPluginAsyncZod = async app => {
  app.get('/api/healthcheck', async () => {
    return {
      live: true,
      when: new Date().toISOString(),
    }
  })
}
