import { and, count, lte, gte, eq, sql } from 'drizzle-orm'

import dayjs from 'dayjs'

import { dbOrm } from '../db/client'
import { goals, goalsCompletions } from '../db/schema'

interface GetWeekPendingGoalsResponse {
  pendingGoals: {
    id: string
    title: string
    desiredWeeklyFrequency: number
    createdAt: Date
    completionCount: number
  }[]
}

export async function getWeekPendingGoalsFunction (): Promise<GetWeekPendingGoalsResponse> {
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayOfWeek = dayjs().endOf('week').toDate()

  const goalsCreatedUpToWeek = dbOrm.$with('goals_created_up_to_week').as(
    dbOrm
      .select({
        id: goals.id,
        title: goals.title,
        desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
        createdAt: goals.createdAt,
      })
      .from(goals)
      .where(lte(goals.createdAt, lastDayOfWeek))
  )

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
          lte(goalsCompletions.createdAt, lastDayOfWeek)
        )
      )
      .groupBy(goalsCompletions.goalId)
  )

  const pendingGoals = await dbOrm
    .with(goalsCreatedUpToWeek, goalCompletionCounts)
    .select({
      id: goalsCreatedUpToWeek.id,
      title: goalsCreatedUpToWeek.title,
      desiredWeeklyFrequency: goalsCreatedUpToWeek.desiredWeeklyFrequency,
      createdAt: goalsCreatedUpToWeek.createdAt,
      completionCount:
        sql /* SQL */` COALESCE(${goalCompletionCounts.completionCount}, 0) `.mapWith(
          Number
        ),
    })
    .from(goalsCreatedUpToWeek)
    .leftJoin(
      goalCompletionCounts,
      eq(goalCompletionCounts.goalId, goalsCreatedUpToWeek.id)
    )

  return {
    pendingGoals,
  }
}
