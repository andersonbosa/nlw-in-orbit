import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import jwt from 'jsonwebtoken'
import { env } from '../env'
import { StatusCodes } from 'http-status-codes'

export async function authenticateHook(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authHeader = request.headers.authorization
  if (!authHeader) {
    reply.status(StatusCodes.UNAUTHORIZED).send({ error: 'Token missing' })
    return
  }

  try {
    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string }
    request.user = { id: decoded.userId }
  } catch (err) {
    reply
      .status(StatusCodes.UNAUTHORIZED)
      .send({ error: 'Invalid or expired token' })
  }
}

export const registerHooks = (app: FastifyInstance) => {
  app.addHook('onRequest', authenticateHook)
}
