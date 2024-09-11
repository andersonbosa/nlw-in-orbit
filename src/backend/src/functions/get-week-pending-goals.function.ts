import { and, count, lte, gte, eq, sql } from 'drizzle-orm'

import dayjs from 'dayjs'

import { dbOrm } from '../db/client'
import { goals, goalCompletions } from '../db/schema'


interface GetWeekPendingGoalsResponse {
  pendingGoals: {
    id: string
    title: string
    desiredWeeklyFrequency: number
    createdAt: Date
    completionCount: number
  }[]
}

export async function getWeekPendingGoals (): Promise<GetWeekPendingGoalsResponse> {
  const lastDayOfWeek = dayjs().endOf('week').toDate()
  const firstDayOfWeek = dayjs().startOf('week').toDate()

  const goalsCreatedUpToWeek = dbOrm.$with('goals_created_up_to_week')
    .as(
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

  const goalCompletionCounts = dbOrm.$with('goal_completion_counts')
    .as(
      dbOrm
        .select({
          goalId: goalCompletions.goalId,
          completionCount: count(goalCompletions.id).as('completionCount')
        })
        .from(goalCompletions)
        .where(
          and(
            gte(goalCompletions.createdAt, firstDayOfWeek),
            lte(goalCompletions.createdAt, lastDayOfWeek),
          )
        )
        .groupBy(goalCompletions.goalId)
    )

  const pendingGoals = await dbOrm
    .with(goalsCreatedUpToWeek, goalCompletionCounts)
    .select({
      id: goalsCreatedUpToWeek.id,
      title: goalsCreatedUpToWeek.title,
      desiredWeeklyFrequency: goalsCreatedUpToWeek.desiredWeeklyFrequency,
      createdAt: goalsCreatedUpToWeek.createdAt,
      completionCount: sql/* SQL */` COALESCE(${goalCompletionCounts.completionCount}, 0) `.mapWith(Number)
    })
    .from(goalsCreatedUpToWeek)
    .leftJoin(
      goalCompletionCounts,
      eq(goalCompletionCounts.goalId, goalsCreatedUpToWeek.id)
    )

  return {
    pendingGoals
  }
}