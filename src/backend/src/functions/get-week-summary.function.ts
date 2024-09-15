import dayjs from 'dayjs'
import { count, gte, lte, and, eq, sql } from 'drizzle-orm'

import { dbOrm } from '../db/client'
import { goals, goalsCompletions } from '../db/schema'

type GoalsPerDayType = Record<
  string,
  {
    id: string
    title: string
    completedAt: string
  }[]
>

interface GetWeekSummaryFunctionResponse {
  summary: {
    completed: number
    total: number
    goalsPerDay: GoalsPerDayType
  } | null
}

export async function getWeekSummaryFunction(): Promise<GetWeekSummaryFunctionResponse> {
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

  const goalsCompletedInWeek = dbOrm.$with('goals_completed_in_week').as(
    dbOrm
      .select({
        id: goals.id,
        title: goals.title,
        completedAt: goalsCompletions.createdAt,
        completedAtDate: sql /* SQL */`DATE(${goalsCompletions.createdAt})`.as(
          'completedAtDate'
        ),
      })
      .from(goalsCompletions)
      .innerJoin(goals, eq(goals.id, goalsCompletions.goalId))
      .where(
        and(
          gte(goalsCompletions.createdAt, firstDayOfWeek),
          lte(goalsCompletions.createdAt, lastDayOfWeek)
        )
      )
  )

  const goalsCompletedByWeedDay = dbOrm.$with('goals_completed_by_weed_day').as(
    dbOrm
      .select({
        completedAtDate: goalsCompletedInWeek.completedAtDate,
        completions: sql /* SQL */`
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', ${goalsCompletedInWeek.id},
              'title', ${goalsCompletedInWeek.title},
              'completedAt', ${goalsCompletedInWeek.completedAt}
            )
          )
        `.as('completions'),
      })
      .from(goalsCompletedInWeek)
      .groupBy(goalsCompletedInWeek.completedAtDate)
  )

  const result = await dbOrm
    .with(goalsCreatedUpToWeek, goalsCompletedInWeek, goalsCompletedByWeedDay)
    .select({
      completed:
        sql /* SQL */` (SELECT COUNT(*) FROM ${goalsCompletedInWeek}) `.mapWith(
          Number
        ),
      total:
        sql /* SQL */` (SELECT SUM(${goalsCreatedUpToWeek.desiredWeeklyFrequency}) FROM ${goalsCreatedUpToWeek}) `.mapWith(
          Number
        ),
      goalsPerDay: sql /* SQL */<GoalsPerDayType>`
        JSON_OBJECT_AGG(
          ${goalsCompletedByWeedDay.completedAtDate},
          ${goalsCompletedByWeedDay.completions}
        )
      `,
    })
    .from(goalsCompletedByWeedDay)

  return {
    summary: result.length ? result[0] : null,
  }
}
