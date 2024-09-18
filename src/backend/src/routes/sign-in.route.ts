import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { SignInFunction } from '../functions/sign-in.function'

import { StatusCodes, ReasonPhrases } from 'http-status-codes'

export const signInRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/api/sign-in',
    {
      schema: {
        body: z.object({
          email: z.string().email(),
          password: z.string()//.min(8),
        })
      }
    },
    async (request, reply) => {
      const { email, password } = request.body
      try {
        const result = await SignInFunction.signInFunction({ email, password })
        return result
      } catch (err) {
        if (err instanceof SignInFunction.InvalidCredentialsError) {
          return reply
            .status(StatusCodes.UNAUTHORIZED)
            .send(ReasonPhrases.UNAUTHORIZED)
        }
        throw err
      }

    }
  )
}
