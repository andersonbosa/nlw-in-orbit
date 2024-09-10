import fastify from "fastify";

const app = fastify();

app
  .listen({
    port: 3333,
  })
  .then((liveUrl) => {
    console.log(`HTTP Server Running: "${liveUrl}"`)
  })
