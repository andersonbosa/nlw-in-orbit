import fastify from 'fastify'
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { createGoalRoute } from '../routes/create-goal.route'
import { healthcheckRoute } from '../routes/healthcheck.route'
import { createGoalCompletionRoute } from '../routes/create-goal-completion.route'
import { getWeekPendingGoalsRoute } from '../routes/get-week-pending-goals.route'

const app = fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(healthcheckRoute)
app.register(createGoalRoute)
app.register(createGoalCompletionRoute)
app.register(getWeekPendingGoalsRoute)


export { app }
