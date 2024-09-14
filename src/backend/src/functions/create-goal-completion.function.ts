import { and, count, eq, gte, lte } from 'drizzle-orm'
import dayjs from 'dayjs'
import { sql } from 'drizzle-orm'

import { dbOrm } from '../db/client'
import { goalsCompletions, goals } from '../db/schema'

interface CreateGoalCompletionRequest {
  goalId: string
}

export async function createGoalCompletionFunction ({
  goalId,
}: CreateGoalCompletionRequest) {
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayOfWeek = dayjs().endOf('week').toDate()

  const goalCompletionCounts = dbOrm.$with('goal_completion_counts').as(
    dbOrm
      .select({
        goalId: goalsCompletions.goalId,
        completionCount: count(goalsCompletions.id).as('completionCount'),
      })
      .from(goalsCompletions)
      .where(
        and(
          gte(goalsCompletions.createdAt, firstDayOfWeek),
          lte(goalsCompletions.createdAt, lastDayOfWeek),
          eq(goalsCompletions.goalId, goalId)
        )
      )
      .groupBy(goalsCompletions.goalId)
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

  if (!result.length) {
    throw new Error('Goal not found!')
  }

  const { completionCount, desiredWeeklyFrequency } = result[0]

  if (completionCount >= desiredWeeklyFrequency) {
    throw new Error('Goal already completed this week!')
  }

  const insertResult = await dbOrm
    .insert(goalsCompletions)
    .values({ goalId })
    .returning()

  const goalCompletion = insertResult[0]

  return {
    goalCompletion,
  }
}
