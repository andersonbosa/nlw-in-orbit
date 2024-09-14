import { dbOrm } from '../db/client'
import { goals } from '../db/schema'

interface CreateGoalRequest {
  title: string
  desiredWeeklyFrequency: number
}

export async function createGoalFunction({
  title,
  desiredWeeklyFrequency,
}: CreateGoalRequest) {
  const insertResult = await dbOrm
    .insert(goals)
    .values({ title, desiredWeeklyFrequency })
    .returning()

  const goal = insertResult[0]

  return {
    goal,
  }
}
