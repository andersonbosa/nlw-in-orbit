export declare module 'fastify' {
  interface FastifyRequest {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    user: {
      id?: string
    }
  }
}
