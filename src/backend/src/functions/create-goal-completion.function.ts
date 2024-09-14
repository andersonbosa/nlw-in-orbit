import { and, count, eq, gte, lte } from 'drizzle-orm'
import dayjs from 'dayjs'
import { sql } from 'drizzle-orm'

import { dbOrm } from '../db/client'
import { goalCompletions, goals } from '../db/schema'

interface CreateGoalCompletionRequest {
  goalId: string
}

export async function createGoalCompletionFunction({
  goalId,
}: CreateGoalCompletionRequest) {
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayOfWeek = dayjs().endOf('week').toDate()

  const goalCompletionCounts = dbOrm.$with('goal_completion_counts').as(
    dbOrm
      .select({
        goalId: goalCompletions.goalId,
        completionCount: count(goalCompletions.id).as('completionCount'),
      })
      .from(goalCompletions)
      .where(
        and(
          gte(goalCompletions.createdAt, firstDayOfWeek),
          lte(goalCompletions.createdAt, lastDayOfWeek),
          eq(goalCompletions.goalId, goalId)
        )
      )
      .groupBy(goalCompletions.goalId)
  )

  const result = await dbOrm
    .with(goalCompletionCounts)
    .select({
      desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
      completionCount:
        sql /* SQL */` COALESCE(${goalCompletionCounts.completionCount}, 0) `.mapWith(
          Number
        ),
    })
    .from(goals)
    .leftJoin(goalCompletionCounts, eq(goalCompletionCounts.goalId, goals.id))
    .where(eq(goals.id, goalId))
    .limit(1)

  const { completionCount, desiredWeeklyFrequency } = result[0]

  if (completionCount >= desiredWeeklyFrequency) {
    throw new Error('Goal already completed this week!')
  }

  const insertResult = await dbOrm
    .insert(goalCompletions)
    .values({ goalId })
    .returning()

  const goalCompletion = insertResult[0]

  return {
    goalCompletion,
  }
}
