import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { signUpFunction } from '../functions/sign-up.function'

export const signUpRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/api/sign-up',
    {
      schema: {
        body: z.object({
          email: z.string().email(),
          password: z.string().min(8),
        }),
      },
    },
    async request => {
      const { email, password } = request.body
      // const result = await signUpFunction({ email, password })
      // return result
      return {}
    }
  )
}
