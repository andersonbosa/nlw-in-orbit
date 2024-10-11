import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { SignUpRequest } from '../functions/sign-up.function'

export const signUpRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/api/sign-up',
    {
      schema: {
        body: z.object({
          username: z.string().min(5),
          email: z.string().email(),
          password: z.string().min(8),
        }),
      },
    },
    async request => {
      const { username, email, password } = request.body
      try {
        const result = await SignUpRequest.signUpFunction({ username, email, password })
        return result
      } catch (err) {
        // biome-ignore lint/complexity/noUselessCatch: <explanation>
        throw err
      }
    }
  )
}
